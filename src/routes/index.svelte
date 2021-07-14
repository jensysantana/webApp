<script>
	import { setContext } from 'svelte';

	import {
		// page,
		getStores,
		// navigating,
		//  session
		page
	} from '$app/stores';
	// console.log('page55555555555+++++++++++: ', page);

	// import { AUTHAPI } from '../services/api-auth';
	let nnn;
	page.subscribe((page) => {
		console.log('page: ', page);
		nnn = page;
	});
	setContext('pagd', nnn);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
