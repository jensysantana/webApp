const AllRoutes = {
    pages: [
        {
            _id: '1',
            page: 'Sign up',
            route: '/account/sign-up',
            nick: 'signup',
        },
        {
            _id: '2',
            page: 'Sign in',
            route: '/account/sign-in',
            nick: 'signin',
        },
        {
            _id: '2',
            page: 'Sign Out',
            route: '/account/sign-out',
            nick: 'signout',
        },
        // {
        //     _id: '1',
        //     page: 'Home',
        //     route: '/home',
        //     route2: '/',
        //     nick: 'home',
        // },
        // {
        //     _id: '4',
        //     page: 'Account validate',
        //     route: '/account/account-validate',
        //     nick: 'accvalidate',
        // },
        // {
        //     _id: '6',
        //     page: 'Get account validate',
        //     route: '/account/get-account-validate',
        //     nick: 'getEmailAccV',
        // },
        // {
        //     _id: '7',
        //     page: 'Recovery feedback', //used
        //     route: '/account/recovery-feedback',
        //     nick: 'recoveryfeed',
        // },
        // {
        //     _id: '8',
        //     page: 'Account reset password',
        //     route: '/account/recover-password',
        //     nick: 'accresetpass',
        // },
        // {
        //     _id: '9',
        //     page: 'Account recovery',
        //     route: '/account/recovery',
        //     nick: 'accrecovery',
        // },
        // {
        //     _id: '10',
        //     page: 'Account validation feedback',
        //     route: '/account/account-validation-feedback',
        //     nick: 'accvalidfeed',
        // },
        // {
        //     _id: '11',
        //     page: 'Account OTP recovery',
        //     route: '/account/otp-sms-recovery',
        //     nick: 'accotpsmsrec',
        // },
        // {
        //     _id: '12',
        //     page: 'Get email recovery',
        //     route: '/account/recovery-get-email',
        //     nick: 'getemailrec',
        // },
        // {
        //     _id: '13',
        //     page: 'Set password account',
        //     route: '/account/set-password',
        //     nick: 'setPass',
        // },
        // {
        //     _id: '14',
        //     page: 'Recovery check code',
        //     route: '/account/recovery-check-otp',
        //     nick: 'recotp',
        // },
        // {
        //     _id: '15',
        //     page: 'FeedBack',
        //     route: '/account/sfb',
        //     nick: 'acc-sfb',
        // },
        // {
        //     _id: '16',
        //     page: 'Chat',
        //     route: '/chat/messages',
        //     nick: 'chat-auth',
        // },
    ],
    getPage: function (page) {
        if (page) {
            return this.pages.find(p => p.nick === page);
        }
        return this.pages;
    },
    getPageName: function (page) {
        const pageDb = this.getPage(page);
        return pageDb.name;
    },
    getPageRoute: function (page) {
        const pageDb = this.getPage(page);
        console.log('pageDb: ', pageDb);
        return pageDb.route;
    },
}

export default AllRoutes;