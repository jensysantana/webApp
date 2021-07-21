export default {
    name: "getULang",
    kind: "HoudiniQuery",

    raw: `query getULang($lang: String!) {
  getULang(lang: $lang) {
    response {
      success
      message
      name
    }
  }
}
`,

    rootType: "Query",

    selection: {
        "getULang": {
            "type": "BasicErrorResponse",
            "keyRaw": "getULang(lang: $lang)",

            "fields": {
                "response": {
                    "type": "BasicError",
                    "keyRaw": "response",

                    "fields": {
                        "success": {
                            "type": "Boolean",
                            "keyRaw": "success"
                        },

                        "message": {
                            "type": "String",
                            "keyRaw": "message"
                        },

                        "name": {
                            "type": "String",
                            "keyRaw": "name"
                        }
                    }
                }
            }
        }
    },

    input: {
        "fields": {
            "lang": "String"
        },

        "types": {}
    }
};