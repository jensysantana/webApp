<!-- <script context="module">
	export function load() {
		
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
	import { query, graphql } from '$houdini';

	const fetchQuery = (operation, variables) => {
		const datax = fetch('http://localhost:4300/graphql', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				// doc_id: operation.id, // NOTE: pass md5 hash to the server
				// query: operation.text, // this is now obsolete because text is null
				query: `
				query getULang($lang: String!) {
					getULang(lang: $lang) {
						response {
							success
							message
							name
						}
					}
				}
				`,
				// variables
				variables: {
					lang: 'es-DO'
				}
			})
		}).then((response) => {
			return response.json();
		});
		return datax;
	};

	async function loadInitLang(lang) {
		console.log('---------lang---------');
		console.log(lang);
		console.log('---------lang---------');

		fetchQuery(null, null)
			.then((dbData) => {
				console.log('dbData1111111111: ', dbData);
				console.log('dbData ---------------*******: ', dbData.data);
			})
			.catch((dbError) => {
				console.log('dbError222222222222: ', dbError);
			});
	}
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
