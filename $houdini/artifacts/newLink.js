export default {
    name: "newLink",
    kind: "HoudiniSubscription",

    raw: `subscription newLink {
  newLink {
    id
    url
    description
  }
}
`,

    rootType: "Subscription",

    selection: {
        "newLink": {
            "type": "Link",
            "keyRaw": "newLink",

            "fields": {
                "id": {
                    "type": "ID",
                    "keyRaw": "id"
                },

                "url": {
                    "type": "String",
                    "keyRaw": "url"
                },

                "description": {
                    "type": "String",
                    "keyRaw": "description"
                }
            }
        }
    }
};