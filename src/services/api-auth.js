import { APP_CONFIG } from "../config/config";

const { server: {
    claford: {
        baseUrl
    }
}

} = APP_CONFIG;

export const AUTHAPI = {

    getCsrf: () => {

        return {
            url: `${baseUrl}/csrf`,
            method: 'get',
        }
    },

    // testarXX: (data) => apiInterceptor({
    //     url: `/?name=JENYS SANNTANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`,
    //     method: 'get'
    // }),
    getLang: (data) => ({
        url: `/app-langs`,
        method: 'post',
        data
    })
    /*
    isAccExist: (data) => apiInterceptor({
        url: `${api}/auth/verify-account-exists`,
        data,
        method: 'post'
    }),
    signIn: (data) => apiInterceptor({
        url: `${api}/auth`,
        data,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
    }),
    signUp: (data) => apiInterceptor({
        url: `${api}/user-account`,
        data,
        method: 'post'
    }),
    accValidateFromToken: (data) => apiInterceptor({
        url: `${api}/auth/account-validate-from-token`,
        data,
        method: 'post'
    }),
    accRecoveryPass: (data) => apiInterceptor({
        url: `${api}/auth/recovery-password-from-email`,
        data,
        method: 'post'
    }),

    accGetPhoneFromEmail: (data) => apiInterceptor({
        url: `${api}/auth/get-phone-from-email`,
        method: 'post',
        data
    }),
    accRecoveryFromSMSOTPPhone: (data) => apiInterceptor({
        url: `${api}/auth/recovery-from-sms-otp-phone`,
        data,
        method: 'post'
    }),
    accValidateRecoverySMSOTPPhone: (data) => apiInterceptor({
        url: `${api}/auth/validate-recovery-sms-otp-phone`,
        data,
        method: 'post'
    }),
    accGotNewPassword: (data) => apiInterceptor({
        url: `${api}/auth/reset-password-recovery`,
        data,
        method: 'post'
    }),
    accGotNewPasswordFromToken: (data) => apiInterceptor({
        url: `${api}/auth/reset-password-from-token`,
        data,
        method: 'post'
    }),
*/
}


// export default authentications;