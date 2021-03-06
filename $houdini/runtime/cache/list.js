export class ListHandler {
    constructor({ name, cache, record, key, listType, selection, when, filters, parentID, }) {
        this.record = record;
        this.key = key;
        this.listType = listType;
        this.cache = cache;
        this.selection = selection;
        this._when = when;
        this.filters = filters;
        this.name = name;
        this.parentID = parentID;
    }
    // when applies a when condition to a new list pointing to the same spot
    when(when) {
        return new ListHandler({
            cache: this.cache,
            record: this.record,
            key: this.key,
            listType: this.listType,
            selection: this.selection,
            when,
            filters: this.filters,
            parentID: this.parentID,
            name: this.name,
        });
    }
    append(selection, data, variables = {}) {
        return this.addToList(selection, data, variables, 'last');
    }
    prepend(selection, data, variables = {}) {
        return this.addToList(selection, data, variables, 'first');
    }
    addToList(selection, data, variables = {}, where) {
        // figure out the id of the type we are adding
        const dataID = this.cache.id(this.listType, data);
        // if there are conditions for this operation
        if (!this.validateWhen() || !dataID) {
            return;
        }
        // update the cache with the data we just found
        this.cache.write(selection, data, variables, dataID);
        if (where === 'first') {
            // add the record we just created to the list
            this.record.prependLinkedList(this.key, dataID);
        }
        else {
            // add the record we just created to the list
            this.record.appendLinkedList(this.key, dataID);
        }
        // get the list of specs that are subscribing to the list
        const subscribers = this.record.getSubscribers(this.key);
        // notify the subscribers we care about
        this.cache.internal.notifySubscribers(subscribers, variables);
        // look up the new record in the cache
        const newRecord = this.cache.internal.record(dataID);
        // add the list reference
        newRecord.addListReference({
            parentID: this.parentID,
            name: this.name,
        });
        // walk down the list fields relative to the new record
        // and make sure all of the list's subscribers are listening
        // to that object
        this.cache.internal.insertSubscribers(newRecord, this.selection, variables, ...subscribers);
    }
    removeID(id, variables = {}) {
        // if there are conditions for this operation
        if (!this.validateWhen()) {
            return;
        }
        // add the record we just created to the list
        this.record.removeFromLinkedList(this.key, id);
        // get the list of specs that are subscribing to the list
        const subscribers = this.record.getSubscribers(this.key);
        // notify the subscribers about the change
        this.cache.internal.notifySubscribers(subscribers, variables);
        // disconnect record from any subscriptions associated with the list
        this.cache.internal.unsubscribeSelection(this.cache.internal.record(id), this.selection, variables, ...subscribers.map(({ set }) => set));
    }
    remove(data, variables = {}) {
        const targetID = this.cache.id(this.listType, data);
        if (!targetID) {
            return;
        }
        // figure out the id of the type we are adding
        this.removeID(targetID, variables);
    }
    validateWhen() {
        // if this when doesn't apply, we should look at others to see if we should update those behind the scenes
        let ok = true;
        // if there are conditions for this operation
        if (this._when) {
            // we only NEED there to be target filters for must's
            const targets = this.filters;
            // check must's first
            if (this._when.must && targets) {
                ok = Object.entries(this._when.must).reduce((prev, [key, value]) => Boolean(prev && targets[key] == value), ok);
            }
            // if there are no targets, nothing could be true that can we compare against
            if (this._when.must_not) {
                ok =
                    !targets ||
                        Object.entries(this._when.must_not).reduce((prev, [key, value]) => Boolean(prev && targets[key] != value), ok);
            }
        }
        return ok;
    }
    // iterating over the list handler should be the same as iterating over
    // the underlying linked list
    *[Symbol.iterator]() {
        for (let record of this.record.linkedList(this.key)) {
            yield record;
        }
    }
}
