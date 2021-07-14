import { Record } from './record';
import { ListHandler } from './list';
import { isScalar } from '../scalars';
// this class implements the cache that drives houdini queries
export class Cache {
    constructor(config) {
        // the map from entity id to record
        this._data = new Map();
        // associate list names with the handler that wraps the list
        this._lists = new Map();
        this._config = config;
    }
    // save the response in the local store and notify any subscribers
    write(selection, data, variables = {}, id) {
        const specs = [];
        const parentID = id || rootID;
        // recursively walk down the payload and update the store. calls to update atomic fields
        // will build up different specs of subscriptions that need to be run against the current state
        this._write(parentID, parentID, selection, parentID, data, variables, specs);
        // compute new values for every spec that needs to be run
        this.notifySubscribers(specs, variables);
    }
    id(type, data) {
        // try to compute the id of the record
        const id = typeof data === 'string' ? data : this.computeID(data);
        if (!id) {
            return null;
        }
        return type + ':' + id;
    }
    idFields(type) {
        return ['id'];
    }
    subscribe(spec, variables = {}) {
        // find the root record
        let rootRecord = spec.parentID ? this.record(spec.parentID) : this.root();
        if (!rootRecord) {
            throw new Error('Could not find root of subscription');
        }
        // walk down the selection and register any subscribers
        this.addSubscribers(rootRecord, spec, spec.selection, variables);
    }
    unsubscribe(spec, variables = {}) {
        // find the root record
        let rootRecord = spec.parentID ? this.getRecord(spec.parentID) : this.root();
        // if there's no root, there's nothing to unsubscribe from
        if (!rootRecord) {
            return;
        }
        // walk down the selection and remove any subscribers from the list
        this.removeSubscribers(rootRecord, spec, spec.selection, variables);
    }
    // get the list handler associated by name
    list(name, id) {
        var _a;
        // make sure that the handler exists
        const handler = (_a = this._lists.get(name)) === null || _a === void 0 ? void 0 : _a.get(id || rootID);
        if (!handler) {
            throw new Error(`Cannot find list with name: ${name} under parent: ${id}. ` +
                'Is it possible that the query is not mounted?');
        }
        // return the handler
        return handler;
    }
    // remove the record from every list we know of and the cache itself
    delete(id, variables = {}) {
        const record = this.record(id);
        // remove any related subscriptions
        record.removeAllSubscribers();
        for (const { name, parentID } of record.lists) {
            // look up the list
            const list = this.list(name, parentID);
            // remove the entity from the list
            list.removeID(id, variables);
        }
        // remove the entry from the cache
        return this._data.delete(id);
    }
    // grab the record specified by {id}.
    // note: this is hidden behind the adapter because it will make entries in the
    // cache that might not play by the correct garbage keeping rules. "advanced users only"
    record(id) {
        // if we haven't seen the record before add an entry in the store
        if (!this._data.has(id)) {
            this._data.set(id, new Record(this));
        }
        // write the field value
        return this._data.get(id);
    }
    get internal() {
        return {
            notifySubscribers: this.notifySubscribers.bind(this),
            insertSubscribers: this.insertSubscribers.bind(this),
            unsubscribeSelection: this.unsubscribeSelection.bind(this),
            evaluateKey: this.evaluateKey.bind(this),
            record: this.record.bind(this),
            getRecord: this.getRecord.bind(this),
            getData: this.getData.bind(this),
        };
    }
    computeID(data) {
        return data.id;
    }
    root() {
        return this.record(rootID);
    }
    // walk down the spec
    getData(parent, selection, variables) {
        var _a, _b;
        // we could be asking for values of null
        if (parent === null || typeof parent === 'undefined') {
            return null;
        }
        const target = {};
        // look at every field in the parentFields
        for (const [attributeName, { type, keyRaw, fields }] of Object.entries(selection)) {
            const key = this.evaluateKey(keyRaw, variables);
            // if the link points to a record then we just have to add it to the one
            const linkedRecord = parent.linkedRecord(key);
            // if the link points to a list
            const linkedList = parent.linkedList(key);
            // if the attribute links to a null value
            if (linkedRecord === null) {
                target[attributeName] = null;
                continue;
            }
            // the field could be an object
            if (linkedRecord && fields) {
                target[attributeName] = this.getData(linkedRecord, fields, variables);
                continue;
            }
            // the field could be a list
            else if (linkedList && fields) {
                target[attributeName] = linkedList.map((linkedRecord) => this.getData(linkedRecord, fields, variables));
            }
            // we are looking at a scalar or some other type we don't recognize
            else {
                // look up the primitive value
                const val = parent.getField(key);
                // is the type a custom scalar with a specified unmarshal function
                if ((_b = (_a = this._config.scalars) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.unmarshal) {
                    // pass the primitive value to the unmarshal function
                    target[attributeName] = this._config.scalars[type].unmarshal(val);
                }
                // the field does not have an unmarshal function
                else {
                    target[attributeName] = val;
                }
                // we're done
                continue;
            }
        }
        return target;
    }
    addSubscribers(rootRecord, spec, selection, variables) {
        var _a;
        for (const { type, keyRaw, fields, list, filters } of Object.values(selection)) {
            const key = this.evaluateKey(keyRaw, variables);
            // add the subscriber to the field
            rootRecord.addSubscriber(keyRaw, key, spec);
            // if the field points to a link, we need to subscribe to any fields of that
            // linked record
            if (!isScalar(this._config, type)) {
                // if the link points to a record then we just have to add it to the one
                const linkedRecord = rootRecord.linkedRecord(key);
                let children = linkedRecord ? [linkedRecord] : rootRecord.linkedList(key);
                // if this field is marked as a list, register it
                if (list && fields) {
                    // if we haven't seen this list before
                    if (!this._lists.has(list)) {
                        this._lists.set(list, new Map());
                    }
                    // if we haven't already registered a handler to this list in the cache
                    (_a = this._lists.get(list)) === null || _a === void 0 ? void 0 : _a.set(spec.parentID || rootID, new ListHandler({
                        name: list,
                        parentID: spec.parentID,
                        cache: this,
                        record: rootRecord,
                        listType: type,
                        key,
                        selection: fields,
                        filters: Object.entries(filters || {}).reduce((acc, [key, { kind, value }]) => {
                            return {
                                ...acc,
                                [key]: kind !== 'Variable' ? value : variables[value],
                            };
                        }, {}),
                    }));
                }
                // if we're not related to anything, we're done
                if (!children || !fields) {
                    continue;
                }
                // add the subscriber to every child
                for (const child of children) {
                    // avoid null children
                    if (!child) {
                        continue;
                    }
                    // the children of a list need the reference back
                    if (list) {
                        // add the list reference to record
                        child.addListReference({
                            name: list,
                            parentID: spec.parentID,
                        });
                    }
                    // make sure the children update this subscription
                    this.addSubscribers(child, spec, fields, variables);
                }
            }
        }
    }
    removeSubscribers(rootRecord, spec, selection, variables) {
        for (const { type, keyRaw, fields, list } of Object.values(selection)) {
            // figure out the actual key
            const key = this.evaluateKey(keyRaw, variables);
            // remove the subscriber to the field
            rootRecord.forgetSubscribers(spec);
            // if this field is marked as a list remove it from teh cache
            if (list) {
                this._lists.delete(list);
                rootRecord.removeListReference({
                    name: list,
                    parentID: spec.parentID,
                });
            }
            // if the field points to a link, we need to remove any subscribers on any fields of that
            // linked record
            if (!isScalar(this._config, type)) {
                // if the link points to a record then we just have to remove it to the one
                const linkedRecord = rootRecord.linkedRecord(key);
                let children = linkedRecord ? [linkedRecord] : rootRecord.linkedList(key);
                // if we still don't have anything to attach it to then there's no one to subscribe to
                if (!children || !fields) {
                    continue;
                }
                // remove the subscriber to every child
                for (const child of children) {
                    // avoid null children
                    if (!child) {
                        continue;
                    }
                    this.removeSubscribers(child, spec, fields, variables);
                }
            }
        }
    }
    _write(rootID, // the ID that anchors any lists
    parentID, // the ID that can be used to build up the key for embedded data
    selection, recordID, // the ID of the record that we are updating in cache
    data, variables, specs) {
        var _a, _b;
        // the record we are storing information about this object
        const record = this.record(recordID);
        // look at ever field in the data
        for (const [field, value] of Object.entries(data)) {
            if (!selection || !selection[field]) {
                throw new Error('Could not find field listing in selection for ' +
                    field +
                    ' @ ' +
                    JSON.stringify(selection) +
                    '');
            }
            // look up the field in our schema
            let { type: linkedType, keyRaw, fields, operations, list, abstract: isAbstract, } = selection[field];
            const key = this.evaluateKey(keyRaw, variables);
            // make sure we found the type info
            if (!linkedType) {
                throw new Error('could not find the field information for ' + field);
            }
            // if the value we are writing is null
            if (value === null) {
                // just treat it as a linked object
                record.writeRecordLink(key, null);
            }
            // the subscribers we need to register if we updated something
            const subscribers = record.getSubscribers(key);
            // if the value is an object, we know it points to a linked record
            if (value instanceof Object && !Array.isArray(value) && fields) {
                // if we ran into an interface
                if (isAbstract) {
                    // make sure we have a __typename field
                    if (!value.__typename) {
                        throw new Error('Encountered interface type without __typename in the payload');
                    }
                    // we need to look at the __typename field in the response for the type
                    linkedType = value.__typename;
                }
                // look up the current known link id
                const oldID = record.linkedRecordID(key);
                // figure out if this is an embedded object or a linked one by looking for all of the fields marked as
                // required to compute the entity's id
                const embedded = ((_a = this.idFields(linkedType)) === null || _a === void 0 ? void 0 : _a.filter((field) => typeof value[field] === 'undefined').length) > 0;
                // figure out the id of the new linked record
                const linkedID = !embedded ? this.id(linkedType, value) : `${parentID}.${key}`;
                // if we are now linked to a new object we need to record the new value
                if (linkedID && oldID !== linkedID) {
                    // record the updated value
                    record.writeRecordLink(key, linkedID);
                    // if there was a record we replaced
                    if (oldID) {
                        // we need to remove any subscribers that we just added to the specs
                        this.record(oldID).forgetSubscribers(...subscribers);
                    }
                    // add every subscriber to the list of specs to change
                    specs.push(...subscribers);
                }
                // only update the data if there is an id for the record
                if (linkedID) {
                    // update the linked fields too
                    this._write(rootID, recordID, fields, linkedID, value, variables, specs);
                }
            }
            // the value could be a list
            else if (!isScalar(this._config, linkedType) && Array.isArray(value) && fields) {
                // build up the list of linked ids
                const linkedIDs = [];
                // look up the current known link id
                const oldIDs = record.linkedListIDs(this.evaluateKey(key, variables));
                // the ids that have been added since the last time
                const newIDs = [];
                // figure out if this is an embedded list or a linked one by looking for all of the fields marked as
                // required to compute the entity's id in the first non-null value we can find
                // visit every entry in the list
                for (const [i, entry] of value.entries()) {
                    // if the entry is a null value, just add it to the list
                    if (entry === null) {
                        linkedIDs.push(null);
                        continue;
                    }
                    // figure out if this record is embedded
                    const embedded = ((_b = this.idFields(linkedType)) === null || _b === void 0 ? void 0 : _b.filter((field) => typeof entry[field] === 'undefined').length) > 0;
                    // this has to be an object for sanity sake (it can't be a link if its a scalar)
                    if (!(entry instanceof Object) || Array.isArray(entry)) {
                        throw new Error('Encountered link to non objects');
                    }
                    let innerType = linkedType;
                    // if we ran into an interface
                    if (isAbstract) {
                        // make sure we have a __typename field
                        if (!entry.__typename) {
                            throw new Error('Encountered interface type without __typename in the payload');
                        }
                        // we need to look at the __typename field in the response for the type
                        innerType = entry.__typename;
                    }
                    // build up an
                    const linkedID = !embedded
                        ? this.id(innerType, entry)
                        : `${parentID}.${key}[${i}]`;
                    // if we couldn't compute the id, just move on
                    if (!linkedID) {
                        continue;
                    }
                    // update the linked fields too
                    this._write(rootID, recordID, fields, linkedID, entry, variables, specs);
                    // add the id to the list
                    linkedIDs.push(linkedID);
                    // hold onto the new ids
                    if (!oldIDs.includes(linkedID)) {
                        newIDs.push(linkedID);
                        if (list) {
                            this.record(linkedID).addListReference({
                                parentID: rootID,
                                name: list,
                            });
                        }
                    }
                }
                // we have to notify the subscribers if a few things happen:
                // either the data changed (ie we got new content for the same list)
                // or we got content for a new list which could already be known. If we just look at
                // wether the IDs are the same, situations where we have old data that
                // is still valid would not be triggered
                const contentChanged = JSON.stringify(linkedIDs) !== JSON.stringify(oldIDs);
                let oldSubscribers = {};
                // we need to look at the last time we saw each subscriber to check if they need to be added to the spec
                for (const subscriber of subscribers) {
                    // if either are true, add the subscriber to the list
                    if (contentChanged) {
                        specs.push(subscriber);
                    }
                }
                // remove any subscribers we don't care about
                for (const lostID of oldIDs.filter((id) => id !== null && !linkedIDs.includes(id))) {
                    const id = lostID;
                    for (const sub of subscribers) {
                        if (!oldSubscribers[id]) {
                            oldSubscribers[id] = new Set();
                        }
                        oldSubscribers[id].add(sub);
                    }
                }
                for (const [id, subscribers] of Object.entries(oldSubscribers)) {
                    this.record(id).forgetSubscribers(...subscribers);
                }
                // if there was a change in the list
                if (contentChanged) {
                    // update the cached value
                    record.writeListLink(key, linkedIDs);
                }
            }
            // the value is neither an object or a list so its a scalar
            else {
                // if the value is different
                if (value !== record.getField(key)) {
                    // update the cached value
                    record.writeField(key, value);
                    // add every subscriber to the list of specs to change
                    specs.push(...subscribers);
                }
            }
            // handle any operations relative to this node
            for (const operation of operations || []) {
                // turn the ID into something we can use
                let parentID;
                if (operation.parentID) {
                    // if its a normal scalar we can use the value directly
                    if (operation.parentID.kind !== 'Variable') {
                        parentID = operation.parentID.value;
                    }
                    else {
                        const value = variables[operation.parentID.value];
                        if (typeof value !== 'string') {
                            throw new Error('parentID value must be a string');
                        }
                        parentID = value;
                    }
                }
                // only insert an object into a list if we're adding an object with fields
                if (operation.action === 'insert' &&
                    value instanceof Object &&
                    !Array.isArray(value) &&
                    fields &&
                    operation.list) {
                    this.list(operation.list, parentID)
                        .when(operation.when)
                        .addToList(fields, value, variables, operation.position || 'last');
                }
                // only insert an object into a list if we're adding an object with fields
                else if (operation.action === 'remove' &&
                    value instanceof Object &&
                    !Array.isArray(value) &&
                    fields &&
                    operation.list) {
                    this.list(operation.list, parentID)
                        .when(operation.when)
                        .remove(value, variables);
                }
                // delete the operation if we have to
                else if (operation.action === 'delete' && operation.type) {
                    if (typeof value !== 'string') {
                        throw new Error('Cannot delete a record with a non-string ID');
                    }
                    const targetID = this.id(operation.type, value);
                    if (!targetID) {
                        continue;
                    }
                    this.delete(targetID, variables);
                }
            }
        }
    }
    // look up the information for a specific record
    getRecord(id) {
        if (id === null) {
            return null;
        }
        if (!id) {
            return;
        }
        return this._data.get(id) || undefined;
    }
    notifySubscribers(specs, variables = {}) {
        var _a;
        for (const spec of specs) {
            // find the root record
            let rootRecord = spec.parentID ? this.getRecord(spec.parentID) : this.root();
            if (!rootRecord) {
                throw new Error('Could not find root of subscription');
            }
            // trigger the update
            spec.set(this.getData(rootRecord, spec.selection, (_a = spec.variables) === null || _a === void 0 ? void 0 : _a.call(spec)));
        }
    }
    insertSubscribers(record, selection, variables, ...subscribers) {
        // look at every field in the selection and add the subscribers
        for (const { keyRaw, fields } of Object.values(selection)) {
            const key = this.evaluateKey(keyRaw, variables);
            // add the subscriber to the
            record.addSubscriber(keyRaw, key, ...subscribers);
            // if there are fields under this
            if (fields) {
                const linkedRecord = record.linkedRecord(key);
                // figure out who else needs subscribers
                const children = linkedRecord ? [linkedRecord] : record.linkedList(key);
                for (const linkedRecord of children) {
                    // avoid null records
                    if (!linkedRecord) {
                        continue;
                    }
                    // insert the subscriber
                    this.insertSubscribers(linkedRecord, fields, variables, ...subscribers);
                }
            }
        }
    }
    unsubscribeSelection(record, selection, variables, ...subscribers) {
        // look at every field in the selection and add the subscribers
        for (const { keyRaw, fields } of Object.values(selection)) {
            const key = this.evaluateKey(keyRaw, variables);
            // add the subscriber to the
            record.removeSubscribers([key], subscribers);
            // if there are fields under this
            if (fields) {
                // figure out who else needs subscribers
                const children = record.linkedList(key) || [record.linkedRecord(key)];
                for (const linkedRecord of children) {
                    // avoid null records
                    if (!linkedRecord) {
                        continue;
                    }
                    this.unsubscribeSelection(linkedRecord, fields, variables, ...subscribers);
                }
            }
        }
    }
    evaluateKey(key, variables = {}) {
        // accumulate the evaluated key
        let evaluated = '';
        // accumulate a variable name that we're evaluating
        let varName = '';
        // some state to track if we are "in" a string
        let inString = false;
        for (const char of key) {
            // if we are building up a variable
            if (varName) {
                // if we are looking at a valid variable character
                if (varChars.includes(char)) {
                    // add it to the variable name
                    varName += char;
                    continue;
                }
                // we are at the end of a variable name so we
                // need to clean up and add before continuing with the string
                // look up the variable and add the result (varName starts with a $)
                const value = variables[varName.slice(1)];
                evaluated += typeof value !== 'undefined' ? JSON.stringify(value) : 'undefined';
                // clear the variable name accumulator
                varName = '';
            }
            // if we are looking at the start of a variable
            if (char === '$' && !inString) {
                // start the accumulator
                varName = '$';
                // move along
                continue;
            }
            // if we found a quote, invert the string state
            if (char === '"') {
                inString = !inString;
            }
            // this isn't a special case, just add the letter to the value
            evaluated += char;
        }
        return evaluated;
    }
}
// the list of characters that make up a valid graphql variable name
const varChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';
// id that we should use to refer to things in root
export const rootID = '_ROOT_';
