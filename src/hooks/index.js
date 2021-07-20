import cookie from 'cookie';

/**@type {import('sveltejs/kit').GetSession} */
export function getSession(request) {
    // console.log('request: ', request);
    // return cookie.parse(request.headers.cookie || '').session || null;
    return request.headers.cookie || null;
}