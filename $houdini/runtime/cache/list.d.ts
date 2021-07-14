import { SubscriptionSelection, ListWhen, SubscriptionSpec } from '../types';
import { Cache } from './cache';
import { Record } from './record';
export declare class ListHandler {
    readonly record: Record;
    readonly key: string;
    readonly listType: string;
    private cache;
    readonly selection: SubscriptionSelection;
    private _when?;
    private filters?;
    readonly name: string;
    readonly parentID: SubscriptionSpec['parentID'];
    constructor({ name, cache, record, key, listType, selection, when, filters, parentID, }: {
        name: string;
        cache: Cache;
        record: Record;
        key: string;
        listType: string;
        selection: SubscriptionSelection;
        when?: ListWhen;
        filters?: ListHandler['filters'];
        parentID?: SubscriptionSpec['parentID'];
    });
    when(when?: ListWhen): ListHandler;
    append(selection: SubscriptionSelection, data: {}, variables?: {}): void;
    prepend(selection: SubscriptionSelection, data: {}, variables?: {}): void;
    addToList(selection: SubscriptionSelection, data: {}, variables: {}, where: 'first' | 'last'): void;
    removeID(id: string, variables?: {}): void;
    remove(data: {}, variables?: {}): void;
    private validateWhen;
    [Symbol.iterator](): Generator<Record, void, unknown>;
}
