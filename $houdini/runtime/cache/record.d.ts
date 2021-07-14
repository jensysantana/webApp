import { GraphQLValue, Maybe, SubscriptionSpec } from '../types';
import { Cache } from './cache';
declare type List = {
    name: string;
    parentID: string | undefined;
};
export declare class Record {
    fields: {
        [key: string]: GraphQLValue;
    };
    keyVersions: {
        [key: string]: Set<string>;
    };
    private subscribers;
    private recordLinks;
    private listLinks;
    private cache;
    private referenceCounts;
    lists: List[];
    constructor(cache: Cache);
    allSubscribers(): SubscriptionSpec[];
    getField(fieldName: string): GraphQLValue;
    writeField(fieldName: string, value: GraphQLValue): void;
    writeRecordLink(fieldName: string, value: string | null): void;
    writeListLink(fieldName: string, value: (string | null)[]): void;
    linkedRecord(fieldName: string): Record;
    linkedRecordID(fieldName: string): string;
    linkedListIDs(fieldName: string): (string | null)[];
    linkedList(fieldName: string): Maybe<Record>[];
    appendLinkedList(fieldName: string, id: string): void;
    prependLinkedList(fieldName: string, id: string): void;
    removeFromLinkedList(fieldName: string, id: string): void;
    addSubscriber(rawKey: string, key: string, ...specs: SubscriptionSpec[]): void;
    getSubscribers(fieldName: string): SubscriptionSpec[];
    forgetSubscribers(...targets: SubscriptionSpec[]): void;
    removeAllSubscribers(): void;
    addListReference(ref: List): void;
    removeListReference(ref: List): void;
    removeAllSubscriptionVersions(keyRaw: string, spec: SubscriptionSpec): void;
    private forgetSubscribers_walk;
    removeSubscribers(fields: string[], sets: SubscriptionSpec['set'][]): void;
}
export {};
