export default {
    name: "info",
    kind: "HoudiniQuery",

    raw: `query info {
  info
}
`,

    rootType: "Query",

    selection: {
        "info": {
            "type": "String",
            "keyRaw": "info"
        }
    }
};