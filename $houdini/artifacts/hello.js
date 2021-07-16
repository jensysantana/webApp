export default {
    name: "hello",
    kind: "HoudiniQuery",

    raw: `query hello {
  hello
}
`,

    rootType: "Query",

    selection: {
        "hello": {
            "type": "String",
            "keyRaw": "hello"
        }
    }
};