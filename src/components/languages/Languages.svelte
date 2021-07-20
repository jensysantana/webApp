<!-- <script context="module">
	export async function load({ page, fetch, session, context }) {
		// console.log('page loaddd: ', page);
		console.log('session: ', session);

		return {
			props: {
				article: 'cookie...........'
			}
		};
	}
</script> -->
<script>
	import { flagLangs, langsArr } from '../../stores/langs/langStore';
	import {
		// page,
		getStores,
		// navigating,
		//  session
		page
	} from '$app/stores';
	import { onMount } from 'svelte';
	import { query, graphql, subscription } from '$houdini';

	// console.log(
	// 	'---------getStoreSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS---------'
	// );
	// console.log(getStores());
	// getStores().session.subscribe((tokennna) => {
	// 	console.log('tokennna: ', tokennna);
	// });
	// console.log(
	// 	'---------getStoreSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS---------'
	// );
	// import { authApi } from '../../services/api-auth';

	// const { data } = query(graphql`
	// 	query hello {
	// 		hello
	// 	}
	// `);

	// data.subscribe((dakDD) => {
	// 	console.log('---------dakDD---------');
	// 	console.log(dakDD);
	// 	console.log('---------dakDD---------');
	// });
	async function loadInitLang(lang) {
		// load the items
		// await langsArr.setLangs({ uaidLang: lang });
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
		// const langResp = await authApi.getLang({
		// 	lang
		// });
		// const {
		// 	status,
		// 	data: {
		// 		response: { message }
		// 	}
		// } = langResp;
		// if (status === 200) {
		// 	LocalStorageOp.setStorage([{ key: 'ULANG', value: message }]);
		// }
	}

	/*
		let path = '';
		page.subscribe((page) => {
			path = page.path;
			console.log('path *********************************: ');

			console.log(path);
			console.log('path *********************************: ');
		});
	*/

	onMount(async () => {
		// console.log('hasLocal11111: ', window?.location);
		// let hasLocal = LocalStorageOp.getStorage('ULANG');
		// if (!hasLocal) {
		// 	// await loadInitLang("en-US");
		// }
	});
</script>

<li class="nav-item dropdown">
	<a class="nav-link" data-toggle="dropdown" href={'#'}>
		<!-- <i class="far fa-globe" /> -->
		<i class="fa fa-globe" aria-hidden="true" />
		<!-- <span class="badge badge-danger navbar-badge">3</span> -->
	</a>

	<div class="dropdown-menu dropdown-menu dropdown-menu-right">
		<!-- svelte-ignore a11y-invalid-attribute -->
		{#each $flagLangs as item}
			<a
				href={'#'}
				class="dropdown-item"
				on:click|preventDefault={() => {
					loadInitLang(item.code);
				}}
			>
				<div class="media vertical-aligmen">
					<img src={item.FlagUrl} alt={item.lang} class="mr-3 img-circle" height="25px" />
					<h3 class="dropdown-item-title">{item.lang}</h3>
				</div>
			</a>
		{/each}
		<!-- <p class="text-sm">Call me whenever you can...</p> -->
	</div>
</li>

<style>
	.vertical-aligmen {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
