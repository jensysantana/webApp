import { createClient } from 'graphql-ws';
const client = createClient({
    url: 'http://localhost:4301/graphql'
});

// query
export async function fecthItem() {
    const result = await new Promise((resolve, reject) => {
        let result;
        client.subscribe(
            {
                query: '{ hello }'
            },
            {
                next: (data) => (result = data),
                error: reject,
                complete: () => resolve(result)
            }
        );
    });
    console.log('---------result---------');
    console.log(result);
    console.log('---------result---------');
    // expect(result).toEqual({ hello: 'Hello World!' });
}

(async () => {
    const result = await new Promise((resolve, reject) => {
        let result;
        client.subscribe(
            {
                query: '{ hello }'
            },
            {
                next: (data) => (result = data),
                error: reject,
                complete: () => resolve(result)
            }
        );
    });
    console.log('---------result---------');
    console.log(result);
    console.log('---------result---------');
    // expect(result).toEqual({ hello: 'Hello World!' });

})()