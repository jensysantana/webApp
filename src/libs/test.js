// import { client } from '$lib/Client.js';
import { client } from './Client';
import { gql } from '@apollo/client/core/core.cjs.js';

export const post = async request => {
    // const { num } = request;

    console.log('num-------------: ', request);
    try {
        // const query = gql`
        //     query Doubled($x: Int) {
        //         double(number: $x)
        //     }
        // `;
        const query = gql`
            query hello
        `;
        const result = await client.query({
            query: query,
            // variables: { x: num }
        });

        console.log('result: ', result);
        return {
            status: 200,
            body: {
                nodes: result.data.double
            }
        }
    } catch (err) {
        console.log('err: ', err);
        return {
            status: 500,
            error: 'Error retrieving data'
        }
    }
}