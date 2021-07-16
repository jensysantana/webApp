// import axios from 'axios';
import { writable, derived } from "svelte/store";

import { DataFormater, LocalStorageOp } from "../../libs/helper-classes";
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

    } = writable({ flags: langs, uaidLang: gLang || langs[0].code, allAppLang: [] });

    return {
        subscribe,
        setLangs: async (lang) => {
            // set(langsArr);
            // console.log('---------xxxxx---------');
            // console.log(langFileMessages(lang));
            // console.log('---------xxxxx---------');
            /*
            axios
                .get('file.json')
                .then(({ data }, ...rest) => {

                    console.log('---------data---------');
                    console.log(data);
                    console.log(rest);
                    console.log('---------data---------');

                })
                .catch((err) => {
                    console.log('---------err---------');
                    console.log(err.response);
                    console.log('---------err---------');
                })
                */
            // set(langs);
        },
        setFieldsLang: (fields) => update((data) => {
            // console.log('data: ', data);
            // console.log('fields: ', fields);
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

    newObj = DataFormater.getSelectedDocObj(objLang, $langsArr.allAppLang);
    // console.log('newObj: ', newObj);

    return { ...newObj };
});

export const langAppPage = derived(langsArr, ($langsArr) => {
    // document: 'authFormsPageText'
    const objLang = langFileMessages({ selectedLang: $langsArr.uaidLang });
    let newObj = {};
    // [
    //     {
    //         keyx: 'gName'
    //     },
    //     {
    //         keyx: 'gLname'
    //     },
    //     {
    //         keyx: 'gEmail'
    //     },
    //     {
    //         keyx: 'gPassword'
    //     },
    //     {
    //         keyx: 'gNewPassword'
    //     },
    //     {
    //         keyx: 'gCPassword'
    //     },
    //     {
    //         keyx: 'gPhone'
    //     },
    //     {
    //         keyx: 'gPhoneCode'
    //     },
    //     {
    //         keyx: 'msgInfo'
    //     },
    //     {
    //         keyx: 'sorryMessages'
    //     },
    //     {
    //         keyx: 'buttonNames'
    //     },
    //     {
    //         keyx: 'messages'
    //     },
    //     {
    //         keyx: 'assistance'
    //     },
    //     {
    //         keyx: 'authFormsValidations'
    //     },
    //     {
    //         keyx: 'authFormsPageText'
    //     }
    // ]
    newObj = DataFormater.getSelectedDocObj(objLang, $langsArr.allAppLang);

    return { allAppLang: { ...newObj } };
});

export const formAuthValidation = derived(langsArr, $langsArr => {
    const objLang = langFileMessages($langsArr.uaidLang);
    const result = objLang.authFormsValidations;
    return { formsAuthValidations: { ...result } };
});