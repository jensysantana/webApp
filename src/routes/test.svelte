<!-- <script>
	// import {
	// 	fragment,
	// 	mutation,
	// 	graphql,
	// 	subscription
	// 	// ItemEntry_item,
	// } from '$houdini';

	// the reference we're passed from our parents
	// export let item: ItemEntry_item;

	// get the information we need about the item
	// const data = fragment('.......');

	// subscription hello {
	// 	hello
	// }
	// since we're just using subscriptions to stay up to date, we don't care about the return value
	// subscription(
	// 	graphql`
	// 		subscription {
	// 			newUser {
	// 				fname
	// 				_id
	// 				lname
	// 				password
	// 			}
	// 		}
	// 	`
	// );
</script> -->
<script>
	// import { query, graphql, subscription } from '$houdini';

	// // load the items
	// const { data } = query(graphql`
	// 	query info {
	// 		info
	// 	}
	// `);

	// data.subscribe((dak) => {
	// 	console.log('---------dak---------');
	// 	console.log(dak);
	// 	console.log('---------dak---------');
	// });

	// const subRest = subscription(
	// 	graphql`
	// 		subscription newLink {
	// 			newLink {
	// 				id
	// 				url
	// 				description
	// 			}
	// 		}
	// 	`
	// );

	// console.log('subRest: ', subRest);
	// subRest.data.subscribe(function (my) {
	// 	console.log('my: ', my);
	// });
</script>

<!-- graphql`
	subscription ItemUpdate($id: ID!) {
		itemUpdate(id: $id) {
			item {
				id
				completed
				text
			}
		}
	}
`, -->

<!-- <script context="module">
	export async function getCsrf() {
		try {
			// const res = await fetch(AUTHAPI.getCsrf());
			// console.log('res: ', res);
			return {
				props: {
					dataUser: 'pageeeeeeeeeeeeeeeeee'
				}
			};
		} catch (error) {
			console.log('error: ', error);
		}
	}
</script> -->
<!-- <script>
	// import { io } from 'socket.io-client';
	import { APP_CONFIG } from '../config/config';
	export let dataUser;

	console.log('dataUser: ', dataUser);
	const {
		server: {
			claford: { baseUrl }
		}
	} = APP_CONFIG;
	/*
	import {
		// page,
		getStores,
		// navigating,
		//  session
		page
	} from '$app/stores';
	console.log('page11111111111111111111111: ', page);
	page.subscribe((nv) => {
		console.log('---------vg---------');
		console.log(nv);
		console.log('---------vg---------');
	});
	*/
	// const socket = io(`${baseUrl}/graphql`, {
	// 	withCredentials: true,
	// 	// auth: (cb) => {},
	// 	extraHeaders: {
	// 		// "my-custom-header": "abcd",
	// 	}
	// 	// path: "/",
	// });
	// socket.on(
	// 	'messagex',
	// 	(msg) => {
	// 		console.log('-------MMMMMSSSSSSSSSAAAAAAGGGGGGGGG-----------');
	// 		console.log(msg);
	// 		console.log('-------MMMMMSSSSSSSSSAAAAAAGGGGGGGGG-----------');
	// 	},
	// 	(user_id) => {
	// 		console.log('user_id: ', user_id);
	// 		console.log('RESULTADO DESDE EL SERVIDOR...');
	// 	}
	// );

	// socket.emit('get-messagesx', { query: JSON.stringify({ query: `{hello}` }) }, (emited) => {
	// 	console.log('emited: ', emited);
	// });
	// socket.on(
	// 	'get-messagesx',
	// 	(getMSG) => {
	// 		console.log('getMSG: ', getMSG);
	// 	},
	// 	(emited) => {
	// 		console.log('emited: ', emited);
	// 	}
	// );

	// socket.emit('messagex', { lastName: 'Zulma...' }, (dataDB) => {
	// 	console.log(
	// 		'dataDBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB: ',
	// 		dataDB
	// 	);
	// });
</script> -->

<!-- <script context="module">
	export async function load() {
		const datax = {
			query: `{
				getUsers{
					_id,
					fname,
					lname,
					email,
					cpassword,
					password,
					createdAt
				},
			}`
		};
		try {
			const res = await fetch('http://localhost:4300/graphql?query={hello}', {
				method: 'get',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
				// body: JSON.stringify(datax)
			});

			const data = await res.json();
			console.log('............................:', data);
			return { props: { dataUser: data } };
		} catch (err) {
			console.error(err);
		}
	}
</script> -->

<!-- <script>
	import { getClient, query } from 'svelte-apollo';
	import { gql } from 'apollo-boost';

	const client = getClient();

	const GETTODOS = gql`
		{
			tasks {
				_id
				title
				description
			}
		}
	`;
	const todos = query(client, { query: GETTODOS });

	// onMount(async () => {
	// 	// const resp = await todos();
	// 	// console.log('resp: ', resp);
	// });
</script> -->

<h2>
	Test component Test component Test component Test component Test component Test component Test
	component Test component Test component Test component Test component Test component Test
	component Test component Test component Test component Test component Test component Test
	component Test component Test component Test component Test component Test component Test
	component Test component Test component Test component
</h2>

<!-- {#await $todos}
	<p>loadding todos</p>
{:then value}
	<p>{JSON.stringify(value)}</p>
{:catch error}
	<p>{JSON.stringify(error)}</p>
{/await} -->
<!-- {#each $todos as {title}}
     
{/each} -->
