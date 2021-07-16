export type newLink = {
    readonly "input": null,
    readonly "result": newLink$result
};

export type newLink$result = {
    readonly newLink: {
        readonly id: string,
        readonly url: string | null,
        readonly description: string | null
    } | null
};