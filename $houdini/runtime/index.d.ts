import { GraphQLTagResult } from './types';
export * from './network';
export * from './types';
export { default as query, routeQuery, componentQuery } from './query';
export { default as mutation } from './mutation';
export { default as fragment } from './fragment';
export { default as subscription } from './subscription';
export declare function graphql(str: TemplateStringsArray): GraphQLTagResult;
