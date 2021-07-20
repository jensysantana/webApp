// import axios from 'axios';
import { writable, derived } from "svelte/store";

import {
    DataFormater,
} from "../../libs/helper-classes";
import { langFileMessages } from "../../libs/setLangs";

// const gLang = LocalStorageOp.getStorage('ULANG');
const gLang = '';

const langs = [
    {
        _id: '1sdsd',
        county: "United State",
        code: "en-US",
        groupName: 'en',
        lang: "English",
        Flag: "",
        FlagUrl: "/assets/img/flag/en.png",
    },
    {
        _id: '2sdsd',
        county: "Dominican Republic",
        code: "es-DO",
        groupName: 'es',
        lang: "Spanish",
        Flag: "",
        FlagUrl: "/assets/img/flag/flag-round-rd.png",
    },
];

function laguageStore() {
    const { subscribe,
        set,
        update,

    } = writable({ flags: langs, uaidLang: langs[0].code, replacer: false, allAppLang: [] });

    return {
        subscribe,
        setLangs: ({ uaidLang }) => update((data) => {
            data.uaidLang = uaidLang;
            return data;
        }),
        setFieldsLang: ({ fields, uaidLang, replacer }) => update((data) => {
            data.uaidLang = uaidLang;
            data.replacer = replacer;
            data.allAppLang = fields;
            return data;
        })
        // set,
        // update
    };

}

export const langsArr = laguageStore();

export const flagLangs = derived(langsArr, $langsArr => {
    return $langsArr.flags;
});

export const langAppPageContent = derived(langsArr, ($langsArr) => {
    // document: 'authFormsPageText' 
    const objLang = langFileMessages({ selectedLang: $langsArr.uaidLang });
    let newObj = {};
    const { allAppLang, replacer } = $langsArr;
    newObj = DataFormater.getSelectedDocObj(objLang, allAppLang, replacer);
    // console.log('newObj: ', newObj);

    return { ...newObj };
});

export const langAppPage = derived(langsArr, ($langsArr) => {
    // document: 'authFormsPageText'
    const objLang = langFileMessages({ selectedLang: $langsArr.uaidLang });
    let newObj = {};
    newObj = DataFormater.getSelectedDocObj(objLang, $langsArr.allAppLang);

    return { allAppLang: { ...newObj } };
});

export const formAuthValidation = derived(langsArr, $langsArr => {
    const objLang = langFileMessages($langsArr.uaidLang);
    const result = objLang.authFormsValidations;
    return { formsAuthValidations: { ...result } };
});