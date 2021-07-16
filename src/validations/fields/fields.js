import { AppRegExp } from "../../libs/helper-classes";
import * as yup from "yup";
// import { GlobalHelper } from "../../helpers/global-helper/global-helper";
import { setLangErrorMessage } from "../../libs/setLangErrorMessage";
import { query, graphql } from '$houdini';


// import { authApi } from "../../services/api-auth";
// import AllRoutes from "../../routes/AllRoutes";
// import { UrlOperations } from "../../helpers/helper-classes";
// import { langAppPage } from "../../stores/langs/langStore";

// const {
//     authFormsPageText: {
//         checkYEmail,
//     },
// } = $langAppPage.allAppLang;

export function fnameValidation() {
    return yup.string().required(function () {
        return setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'fnameRequired',
                defaultMessage: ''
            }
        );
    })
        .trim().lowercase()
        .notOneOf(["admin"])
        .max(45, function (value) {
            return setLangErrorMessage(
                {
                    document: 'authFormsValidations',
                    id: 'fnameMaxlength',
                    defaultMessage: ''
                }
            );
        }).matches(AppRegExp.Regexp().alphaNumSpace, setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'fnameRegex',
                defaultMessage: ''
            }
        ));
    // .strict();
    // .label("First Name")
}
export function lnameValidation() {
    return yup.string().required(function () {
        return setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'lnameRequired',
                defaultMessage: ''
            }
        );
    }).trim()
        .lowercase()
        .notOneOf(["admin"])
        .max(45, function (value) {
            return setLangErrorMessage(
                {
                    document: 'authFormsValidations',
                    id: 'lnameMaxlength',
                    defaultMessage: ''
                }
            );
        }).matches(AppRegExp.Regexp().alphaNumSpace, setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'lnameRegex',
                defaultMessage: ''
            }
        ));
    // .strict();
    // .label("First Name")
}

export function emailValidation({ server, typeReq, message, }) {
    // return yup.string().required().email().label("Email address")
    return yup.string()
        .required(function () {
            return setLangErrorMessage(
                {
                    document: 'authFormsValidations',
                    id: 'emailRequired',
                    defaultMessage: ''
                }
            );
        })
        .trim()
        .lowercase()
        .max(64, setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'emailMaxlength',
                defaultMessage: ''
            }
        ))
        .min(6, setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'emailMinlength',
                defaultMessage: ''
            }
        ))
        .matches(AppRegExp.Regexp().email, setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'emailRegex',
                defaultMessage: ''
            }
        )).test('email-exists', message, async function (email) {

            if (server) {
                let checkYEmail = '';
                console.log('---------email---------');
                console.log(email);
                console.log('---------email---------');

                // load the items
                const { data } = query(graphql`
                    query hello {
                        hello
                    }
                `);
                console.log('---------data---------');
                console.log(data);
                data.subscribe((dak) => {
                    console.log('---------dak---------');
                    console.log(dak);
                    console.log('---------dak---------');
                });
                console.log('---------data---------');

                // langAppPage.subscribe(value => {
                //     checkYEmail = value.allAppLang.authFormsPageText.checkYEmail;
                // });
                try {
                    // const respDb = await authApi.isAccExist({ email });
                    // const {
                    //     status,
                    //     data: {
                    //         response: {
                    //             name,
                    //             message: msg
                    //         }
                    //     }
                    // } = respDb;
                    // if (typeReq === 'singIn') {
                    //     if (!respDb) {
                    //         return false;
                    //     }
                    //     if (status === 202) {

                    //         const pack = {
                    //             showIcon: true,
                    //             headerIconClass: "",
                    //             headerText: checkYEmail,
                    //             headerClass: "",
                    //             message: `${msg}`,
                    //             messageClass: "",
                    //             // redirect: AllRoutes.getPageRoute("signin"),
                    //             data: {
                    //                 email,
                    //                 isVerifyEmail: true,
                    //             },
                    //         };
                    //         //after get new email verification
                    //         let jsonA = GlobalHelper.encodeData(JSON.stringify(pack));
                    //         UrlOperations.redirectURL(`${AllRoutes.getPageRoute('acc-sfb')}/${jsonA}`);
                    //         return this.createError({ message: '', path: 'email' });
                    //     }
                    //     return true; // do not show error
                    // }
                    // if (typeReq === 'singUp') {
                    //     if (respDb) {
                    //         return false; // show error
                    //     }
                    //     return true;// do not show error
                    // }
                } catch (error) {
                    const {
                        data: {
                            response: {
                                name,
                                message: msg
                            }
                        }
                    } = error.response;
                    if (typeReq === 'singIn') {
                        if (name === 'ValidationFeedBackError') {
                            // return this.createError({ message: '${path} nope!', path: 'email' });
                            //preparer data to redirect to where is my email?
                            const pack = {
                                showIcon: false,
                                headerIconClass: "",
                                headerText: checkYEmail,
                                headerClass: "",
                                message: msg,
                                messageClass: "",
                                buttonText: null,
                                // data: {
                                //     // email: frontFields.email,
                                //     isVerifyEmail: true,
                                // },
                            };
                            // let jsonX = GlobalHelper.encodeData(JSON.stringify(pack));
                            // UrlOperations.redirectURL(`${AllRoutes.getPageRoute('accvalidfeed')}/${jsonX}`);
                            // return this.createError({ message: ' ', path: 'email' });
                        }
                        return false; // show error
                    }

                    if (typeReq === 'singUp') {
                        return true;// do not show error
                    }
                }
                return false;
            }
            return true;
        })
    // .matches(AppRegExp.Regexp().email, 'Enter a valid email ej: email@email.com')
}

export function passwordValidation() {
    return yup.string().required(function () {
        // console.log('---------getLangToValidate()---------');
        // console.log(getLangToValidate());
        // console.log('---------getLangToValidate()---------');
        return setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'passwordRequired',
                defaultMessage: ''
            }
        );
    })
        .trim()
        // .min(8, setLangErrorMessage(
        //     {
        //         document: 'authFormsValidations',
        //         id: 'passwordMinlength',
        //         defaultMessage: ''
        //     }
        // ))
        // .max(8, setLangErrorMessage(
        //     {
        //         document: 'authFormsValidations',
        //         id: 'passwordMaxlength',
        //         defaultMessage: ''
        //     }
        // ))
        .matches(AppRegExp.Regexp().password, setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'passwordRegex',
                defaultMessage: ''
            }
        ));
}
export function cPasswordValidation() {
    return yup.string()
        .test("password-match", setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'cpasswordMatch',
                defaultMessage: ''
            }
        ),
            function (value) {
                return this.parent.password === value;
            });
}
export function phoneValidation({ getNumber, getNumberType, getValidationError, isValidNumber, phone, placeholder, server, typeReq }) {
    //{ getNumber, getNumberType, getValidationError, isValidNumber, phone, placeholder }
    return yup.string().trim()
        .required('Enter a mobile phone number')
        .min(9)
        .max(15)
        .matches(AppRegExp.Regexp().phone, {
            message: setLangErrorMessage(
                {
                    document: 'authFormsValidations',
                    id: 'phoneRegex',
                    defaultMessage: `Valid phone format: ${placeholder}`,
                    value: placeholder
                }
            )
        })
        .test('phone-is-valid', '', function () {

            console.log('-----1---PHONEVALIDATION-8888---------');
            console.log(getNumber);
            console.log(getNumberType);
            console.log(getValidationError);
            console.log(isValidNumber);
            console.log(placeholder);
            console.log('-----2--PHONEVALIDATION--8888---------');
            let hasErrrors = '';
            const { message: phErr } = getValidationError;
            if (phErr) {
                // hasErrrors = getValidationError
                return this.createError({ message: phErr, path: 'phone' });
            }

            // return this.createError({ message: `XXXXPhone must match the following: ${placeholder}`, path: 'phone' })
            return false;
        });

    /*
        var numberFormat = {
            "E164": 0,
            "INTERNATIONAL": 1,
            "NATIONAL": 2,
            "RFC3966": 3
        };

    var numberType = {
        "FIXED_LINE": 0,
        "MOBILE": 1,
        "FIXED_LINE_OR_MOBILE": 2,
        "TOLL_FREE": 3,
        "PREMIUM_RATE": 4,
        "SHARED_COST": 5,
        "VOIP": 6,
        "PERSONAL_NUMBER": 7,
        "PAGER": 8,
        "UAN": 9,
        "VOICEMAIL": 10,
        "UNKNOWN": -1
      };

      var validationError = {
        "IS_POSSIBLE": 0,
        "INVALID_COUNTRY_CODE": 1,
        "TOO_SHORT": 2,
        "TOO_LONG": 3,
        "IS_POSSIBLE_LOCAL_ONLY": 4,
        "INVALID_LENGTH": 5,
      };
        https://github.com/jackocnr/intl-tel-input/blob/master/src/js/utils.js#L119
      */
}
export function phoneCodeValidation() {
    // 
    return yup.string()
        .typeError(setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'phoneCodeInvalid',
                defaultMessage: 'Enter a valid numeric verification code.',
            }
        ))
        .required(setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'phoneCodeInvalid',
                defaultMessage: 'Enter a valid numeric verification code.',
            }
        ))
        .length(6, setLangErrorMessage(
            {
                document: 'authFormsValidations',
                id: 'phoneCodeInvalid',
                defaultMessage: 'Enter a valid numeric verification code.',
            }
        ))
    // .max(6, setLangErrorMessage(
    //     {
    //         document: 'authFormsValidations',
    //         id: 'phoneCodeInvalid',
    //         defaultMessage: 'Enter a valid numeric verification code.',
    //     }
    // ))
    // .positive(setLangErrorMessage(
    //     {
    //         document: 'authFormsValidations',
    //         id: 'phoneCodeInvalid',
    //         defaultMessage: 'Enter a valid numeric verification code.',
    //     }
    // ))
    // .integer(setLangErrorMessage(
    //     {
    //         document: 'authFormsValidations',
    //         id: 'phoneCodeInvalid',
    //         defaultMessage: 'Enter a valid numeric verification code.',
    //     }
    // ))
    // .label('jenshys andjs')
    // .max(6, 'Code must be 6 characters')
    // .matches(AppRegExp.Regexp().number, 'Code must be only numbers');
}
export function termAndConditionValidation() {
    return yup.bool()
        .required('Field must be checked')
        .oneOf([true], 'Field must be checked');
}
export function genderValidation() {
    return yup.string().trim()
        .required()
        .label("Gender")
}
export function ageValidation() {
    return yup.number().required().min(18).label("Age").nullable(true).transform((v, o) => o === '' ? null : v);
    //number() .transform((value, original) => original == null || original === "" ? undefined : value ).required()
}
export function answerValidation() {
    return yup.number().required().positive().oneOf([6], "Answer is wrong").label("Answer").nullable(true).transform((v, o) => o === '' ? null : v);
}

/*
let schema = yup.object().shape({
        name: yup.string().required().max(30).label("Name"),
        email: yup.string().required().email().label("Email address"),
        age: yup.number().required().min(18).label("Age").nullable(true).transform((v, o) => o === '' ? null : v),
        answer: yup.number().required().positive().oneOf([6], "Answer is wrong").label("Answer").nullable(true).transform((v, o) => o === '' ? null : v),
        gender: yup.string().required().label("Gender"),
    });


Server side usagae
Its is basically the same, but there is one caveat:
    app.post("/", async (req, res) => {
  try {
    const bodySchema = object({
      name: string().required().notOneOf(["admin"]),
      age: number()
        .transform((value, original) =>
          original == null || original === "" ? undefined : value
        )
        .required(),
    });

    const { age, name } = await validateInput<Asserts<typeof bodySchema>>(
      bodySchema,
      req.body
    );

    return res.json({ age, name });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});
*/

/*
 const validationSchema = Yup.object({
    product: Yup.string().required("Please select a product").oneOf(products),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    title: Yup.string().required(),
    review: Yup.string().required(),
    rating: Yup.number().min(1).max(10).required(),
    date: Yup.date().default(() => new Date()),
    wouldRecommend: Yup.boolean().default(false),
  });

  const initialValues = {
    name: "",
    email: "",
    title: "",
    review: "",
    rating: "",
    date: new Date(),
    wouldRecommend: false,
    product: "",
  };

*/