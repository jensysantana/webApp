import type { Config } from 'houdini-common';
import { GraphQLValue, SubscriptionSelection, SubscriptionSpec } from '../types';
import { ListHandler } from './list';
export declare class Cache {
    _config: Config;
    constructor(config: Config);
    private _data;
    private _lists;
    write(selection: SubscriptionSelection, data: {
        [key: string]: GraphQLValue;
    }, variables?: {}, id?: string): void;
    id(type: string, data: {
        id?: string;
    } | null): string | null;
    id(type: string, id: string): string | null;
    idFields(type: string): string[];
    subscribe(spec: SubscriptionSpec, variables?: {}): void;
    unsubscribe(spec: SubscriptionSpec, variables?: {}): void;
    list(name: string, id?: string): ListHandler;
    delete(id: string, variables?: {}): boolean;
    private record;
    get internal(): CacheProxy;
    private computeID;
    private root;
    private getData;
    private addSubscribers;
    private removeSubscribers;
    private _write;
    private getRecord;
    private notifySubscribers;
    private insertSubscribers;
    private unsubscribeSelection;
    private evaluateKey;
}
export declare type CacheProxy = {
    record: Cache['record'];
    notifySubscribers: Cache['notifySubscribers'];
    unsubscribeSelection: Cache['unsubscribeSelection'];
    insertSubscribers: Cache['insertSubscribers'];
    evaluateKey: Cache['evaluateKey'];
    getRecord: Cache['getRecord'];
    getData: Cache['getData'];
};
export declare const rootID = "_ROOT_";
