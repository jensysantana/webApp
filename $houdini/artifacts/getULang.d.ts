export type getULang = {
    readonly "input": getULang$input,
    readonly "result": getULang$result
};

export type getULang$result = {
    readonly getULang: {
        readonly response: {
            readonly success: boolean | null,
            readonly message: string | null,
            readonly name: string | null
        } | null
    } | null
};

export type getULang$input = {
    lang: string
};