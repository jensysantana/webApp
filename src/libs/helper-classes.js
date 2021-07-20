export class LocalStorageOp {
    // static setStorage(data) {
    //     for (const it of data) {
    //         localStorage.setItem(it.key, it.value);
    //     }
    // }
    static getStorage(data) {
        return localStorage.getItem(data);
    }
}

export class UrlOperations {
    // static getParam(param, winLocation = null) {
    //     const urlParams = new URLSearchParams(winLocation || window.location.search);
    //     return urlParams.has(param) ? urlParams.get(param) : null;
    // }
    // static getParamxx(param, winLocation) {
    //     return new URLSearchParams(winLocation).get(param);
    // }
    // static redirectURL(url, replace = false) {
    //     if (!replace) {
    //         document.location.href = url;
    //     }
    //     if (replace) {
    //         document.location.replace(url);
    //     }
    // }
}

//AUTHENTICATIONS
export class DataFormater { //change to 
    // constructor() {
    //     // this.authHTML = document.querySelector('auth');
    //     // this.signIn();
    // }

    // isAuth = () => {
    //     return false;
    // }
    // signIn(e) {
    //     // console.log('---------e---------');
    //     // console.log(e);
    //     // console.log(this.isAuth());
    //     // console.log('---------e---------');
    //     // if (this.isAuth()) {
    //     //     window.location.href = '/';
    //     //     return false;
    //     // }
    //     // window.location.href = '/auth';
    // }

    // static emailFormaterRecovery(input, param) {
    //     let userName = '';
    //     if (param) {
    //         const indexAt = input.lastIndexOf(param);
    //         userName = input.slice(0, indexAt);
    //         const userEmailHost = input.slice(indexAt);
    //         userName = `${userName.charAt(0)}***${userName.charAt(userName.length - 1)}${userEmailHost}`;
    //     } else {
    //         userName = input;
    //         return `${userName.charAt(0)}***${userName.charAt(userName.length - 1)}`;
    //     }
    //     return userName;
    // }

    static async validateFormErrors(callback) {
        try {
            // await callback();
            return { isValidForm: true, errFields: await callback() };
        } catch (err) {
            let localErrors = [];
            for (const field of err.inner) {
                if (localErrors.some((f) => f.path === field.path) === false) {
                    localErrors = [...localErrors, field];
                }
            }
            // return localErrors;
            return { isValidForm: false, errFields: localErrors };
        }
    }

    static getSelectedDocObj(obj, myKeys, replacer) {
        let newObj = {};

        if (replacer) {
            newObj = obj;
        }

        for (const it of myKeys) {

            for (const key in obj) {

                if (Object.hasOwnProperty.call(obj, key)) {
                    const element = obj[key];
                    if (key === it.keyx) {

                        if (it.select && it['select'].length > 0) {
                            // console.log('-1111111111111111--------keyyyyyyyyyyyyyyyyyyyyyyyyyy---------');
                            // console.log(it.select);
                            // console.log('..........');
                            // console.log(key);
                            // console.log(element);
                            // console.log('-22222222222222222222--------keyyyyyyyyyyyyyyyyyyyyyyyyyy---------');

                            for (const iter of it.select) {

                                if (Object.hasOwnProperty.call(element, iter)) {
                                    if (replacer) {
                                        Object.assign(newObj, {
                                            [iter]: element[iter]
                                        })
                                    } else {
                                        newObj[iter] = element[iter];
                                    }
                                }
                                // console.log('---------Object.hasOwnProperty.call(element, iter)---------');
                                // console.log(Object.hasOwnProperty.call(element, iter));
                                // console.log('---------Object.hasOwnProperty.call(element, iter)---------');
                            }
                        } else {

                            if (replacer) {
                                Object.assign(newObj, { [key]: element });
                            } else {
                                newObj[key] = element;
                            }
                        }
                    }
                }

            }

        }
        return newObj;
    }

    async stringParamsReplacer(data) {
        return this.stringParamsReplacerSync(data);
    }
    static stringParamsReplacerSync({ msg, path, value }) {
        let realMessage = msg;
        if (path && realMessage.includes('{PATH}')) {
            realMessage = realMessage.replace(/{PATH}/g, path)
        }
        if (value && realMessage.includes('{VALUE}')) {
            realMessage = realMessage.replace(/{VALUE}/g, value)
        }
        return realMessage;
    }
    // static transFormErrorToYupMessage(obj, myKeys) {
    //     const objx = this.getSelectedDocObj(obj, myKeys);
    //     let newArr = [];
    //     for (const key in objx) {
    //         if (Object.hasOwnProperty.call(objx, key)) {
    //             newArr.push({ path: key, message: objx[key] })
    //         }
    //     }
    //     return newArr;
    // }

    // static getTokenPayload(token) {
    //     if (!token) return null;
    //     try {
    //         return JSON.parse(atob(token.split('.')[1]));
    //     } catch (error) {
    //         console.log('error: ', error);
    //         return null;
    //     }
    // }

}
export class AppRegExp {

    static Regexp() {
        return {
            // name: /^[a-zA-Z\s]+$/,
            // eslint-disable-next-line
            name_dashes: /^[a-zA-Z\-]+$/,
            // eslint-disable-next-line
            description: /^[\w\s\.]+$/,
            // eslint-disable-next-line
            email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            // eslint-disable-next-line
            emailOrPhone: /^(?:\d{10}|[\w\.\-]+@[\w\.\-]+\.\w{2,3})$/,
            // emailOrPhone: /^(?:\d{10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/,
            // eslint-disable-next-line
            password: /^(?=.*[a-z\_\.\-])(?=.*[A-Z\_\.\-])(?=.*[0-9])[a-zA-Z0-9\_\.\-]+$/,
            // eslint-disable-next-line
            alpha: '^[a-zA-Z]+$',
            // eslint-disable-next-line
            alphaNum: '^[a-zA-Z\d]+$',
            // eslint-disable-next-line
            alphaSpace: /^[a-zA-Z\s]+$/,
            // eslint-disable-next-line
            alphaNumSpace: /^[a-zA-Z\d\s]+$/,
            // eslint-disable-next-line
            gender: '^[F|M]+$',
            // eslint-disable-next-line
            phoneSpecialChars: '^[0-9\-\(\)]+$',
            // eslint-disable-next-line
            phoneSpecialCharsFull: /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
            // phoneNoSpecialChars: '^[0-9]+$',
            // eslint-disable-next-line
            phone: /^[0-9\-\+\s]+$/,
            // eslint-disable-next-line
            dateNoFormated: '/^[a-zA-Z\d\(\)\:\-]+$/', //Fri Jan 17 2020 22:12:27 GMT-0500 (Eastern Standard Time)
            // eslint-disable-next-line
            number: /^[\d]+$/,
            // eslint-disable-next-line
            isMongoId: /^[a-f\d]{24}$/i,
            // eslint-disable-next-line
            tax: /^([\d]+\%)+$/,
            // eslint-disable-next-line
            address: /^[a-zA-Z\d\s\,\.\-]+$/,
            // eslint-disable-next-line
            zipcode: /^([\d]{5})+$/,
            // eslint-disable-next-line
            boolExp: /[true|false]/
        }
    }
}
export class CookiesHelper {

    getCookie(name, cookie) {
        var nameEQ = name + "=";
        var ca = cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    // static setCookie(name, value, days) {
    //     var expires = "";
    //     if (days) {
    //         var date = new Date();
    //         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //         expires = "; expires=" + date.toUTCString();
    //     }
    //     document.cookie = name + "=" + (value || "") + expires + "; path=/";
    // }
}




// setCookie("user_email","bobthegreat@gmail.com",30); //set "user_email" cookie, expires in 30 days
// var userEmail=getCookie("user_email");//"bobthegreat@gmail.com"

// export class RedirectToRoute {

//     static redirectURL(url) {
//         document.location.href = url;
//     }
// }