'use strict'

import { DataFormater, LocalStorageOp } from "./helper-classes";
import { errorsMessages } from "./setLangs";

export function setLangErrorMessage({ id, defaultMessage, document, value, path }) {
    // const intl = errorsMessages({ selectedLang: LocalStorageOp.getStorage("ULANG"), document: document });

    const intl = errorsMessages({ selectedLang: 'en-US', document: document });
    const message = {
        id,
        defaultMessage
    }
    // if (defaultMessage) {
    //     message.defaultMessage
    // }
    let msg = intl.formatMessage(
        message,
        // { ts: Date.now() }
    );

    if (value || path) {
        msg = DataFormater.stringParamsReplacerSync({ msg: msg, path: path, value: value });
    }
    return msg;
}