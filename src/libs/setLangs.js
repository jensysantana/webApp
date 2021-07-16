'use strict'
import { createIntl, createIntlCache } from '@formatjs/intl';
import messagesInenUS from '../data/langs/en/en-US';
import messagesInesDO from '../data/langs/es/es-DO';

export const langFileMessages = ({ selectedLang, document }) => {
    let selectedCountryMessages = messagesInenUS;
    const langs = [
        {
            country: 'en-US',
            message: selectedCountryMessages
        },
        {
            country: 'es-DO',
            message: messagesInesDO
        },
    ];

    selectedCountryMessages = langs.find(lang => lang.country === selectedLang);
    let mesa;
    if (document) {
        mesa = selectedCountryMessages.message[document];
    } else {
        mesa = selectedCountryMessages.message;
    }
    return mesa;
}

export const errorsMessages = ({ selectedLang, document }) => {
    let selectedCountryMessages = messagesInenUS;
    const langs = [
        {
            country: 'en-US',
            message: selectedCountryMessages
        },
        {
            country: 'es-DO',
            message: messagesInesDO
        },
    ];

    selectedCountryMessages = langs.find(lang => lang.country === selectedLang)
    // selectedCountryMessages = langs.find(lang => {
    //     let flagx = false;
    //     if (lang.country === selectedLang && !flagx) {
    //         flagx = true;
    //         if (document) {
    //             console.log('---------lang--findddddddddddd-------');
    //             console.log(lang);
    //             console.log(lang.message[document]);
    //             console.log('---------lang---findddddddddddd------');
    //             return lang.message[document];
    //         }
    //         return lang;
    //     }
    // });
    // process.env.lang = selectedCountryMessages;

    /*
        // Aujourd'hui, c'est le 23/07/2020
        console.log(
          
        )
        console.log('---------++++++++++++++++++---------');
        // 19,00€
        console.log(intl.formatNumber(19, { style: 'currency', currency: 'EUR' }))
        console.log('---------++++++++++++++++++---------');
        */
    let mesa;
    if (document) {
        mesa = selectedCountryMessages.message[document];
    } else {
        mesa = selectedCountryMessages.message;
    }
    return langSelected(mesa, selectedLang);
    // return langs.find(lang => lang.country === selectedLang);
}

const langSelected = (messages, lang) => {
    // This is optional but highly recommended
    // since it prevents memory leak
    const cache = createIntlCache()
    // Create the `intl` object
    const intl = createIntl(
        {
            // Locale of the application
            locale: lang,
            // Locale of the fallback defaultMessage
            defaultLocale: 'en',
            messages: messages,
        },
        cache
    );
    return intl;
}

// const stringFormatMessages = () => {
//     intl.formatMessage(
//         {
//             // Matching ID as above
//             id: 'myMessage',
//             // Default Message in English
//             defaultMessage: 'Today is {ts, date, ::yyyyMMdd}',
//         },
//         { ts: Date.now() }
//     )
// }