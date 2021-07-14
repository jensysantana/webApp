
// console.log('---------host name---------');
// const hostName = window.location.hostname;
// console.log(hostName);
// console.log(window.location.host);
// console.log(window.location.hash);
// console.log(window.location.protocol);
// console.log(window.location.origin);
// console.log(window.location.port);
// console.log(window.location.ancestorOrigins);
// console.log('---------host name---------');
const originUrl = `http://localhost:4300`;
// const originUrl = window.location.origin; // `http://localhost:3000/`,
// console.log('---------env---------');
// console.log(process.env);
// console.log('---------env---------');
const enviromenter = '../static/';
export const ConfigFront = {
    url: `${originUrl}/`,
    appName: 'Claford',
    logoApp: '',
    // publicAssets: `${process.env.PUBLIC_URL}/assets/`
    publicAssets: `${enviromenter}/assets/`
    // publicAssets: '/assets/'
}
// const serverUrl = window.location.hostname.includes('localhost') ? `http://localhost:4300` : 'https://sidetransactions.claford.com';
export const ConfigBackend = {
    backendBaseUrl: originUrl,
    apiBase: '/api/v1',
}

export const APP_CONFIG = {
    client: {
        url: `${originUrl}`,
        appName: 'Claford',
        logoApp: '',
        publicAssets: `${enviromenter}/assets/`
        // publicAssets: `${process.env.PUBLIC_URL}/assets/`
    },
    server: {
        claford: {
            baseUrl: `${originUrl}`,
            baseRoute: '/api/v1---------',
            appName: 'Claford',
            logoApp: '',
            publicAssets: `${enviromenter}/assets/`
        }
    },
}