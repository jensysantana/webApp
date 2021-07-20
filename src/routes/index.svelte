<!-- <script context="module">
	export async function load({ page, fetch, session, context }) {
		console.log('page loaddd: ', page);
		console.log('context: ', context);
		console.log('session: ', session);
		console.log('fetch: ', fetch);

		return {
			props: {
				article: 'cookie...........'
			}
		};
	}
</script> -->
<script>
	// export let article;
	// console.log('article: ', article);
	import Footer from './../shareds/Footer.svelte';
	// import FullScreenModal from './../components/full-screen-modal/FullScreenModal.svelte';
	import { setContext } from 'svelte';
	import {
		// page,
		getStores,
		// navigating,
		//  session
		page
	} from '$app/stores';
	import { goto } from '$app/navigation';
	// import Headers from '../shareds/Headers.svelte';
	// import Preloader from '../components/preloader/Preloader.svelte';
	// import MainsideBar from '../components/MainsideBar.svelte';
	// console.log('page55555555555+++++++++++: ', page);

	// import { AUTHAPI } from '../services/api-auth';
	let nnn;
	page.subscribe((page) => {
		// console.log('pageEEEEEEEEEEEEEEEEEE: ', page);
		nnn = page;
	});
	setContext('pagd', nnn);
</script>

<!-- <Preloader />
	<MainsideBar />
	<Headers /> -->
<button
	on:click={(e) => {
		e.preventDefault();
		goto('/test');
		// goto('/account/sign-in');
	}}
	>Ir aa Lorem ipsum dolor sit amet consectet ur adipisicing elit. Cum rem voluptate animi officiis,
	ur adipisicing eli t. Cum rem voluptate animi officiis,em voluptate animi officiis, ur adipisicing
	elit. Cum rem voluptate animi o fficiis, ur adipisici ng elit. Cum rem voluptate animi officiis,
	ur adipisicing elit. Cum rem voluptate animi offici is, ur adipisicing elit . Cum rem voluptate
	animi officiis, quidem repellen dus atque rerum cupiditate repellat cumque accusantium sunt, quis
	provident, u r ad ipisicing elit. Cum rem voluptate animi officii , ur adipisicing elit. Cum rem
	voluptate animi officiis, ur adipisicing elit. Cum rem voluptate ani mi officiis, ur adipisicing
	elit. Cum rem voluptate animi off iciis, ur adipisicing elit. Cum rem voluptate animi officiis, ur
	adipisici ng elit. Cum r em voluptate animi officiis, ur adipisicing elit. Cum rem voluptate animi
	officiis, ur adipi icin g elit. Cum rem voluptate animi officiis, ur adipisicing elit. Cum rem
	voluptate animi o f ci is, quidem re dus atqu e rerum cupidit ate repellat cumque accusantium
	sunt, provident, possimus blanditiis d olorem ut aliquam? Placeat.</button
>
<!-- <Footer />
	<FullScreenModal /> -->

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<style>
	/* your styles go here */
	/* .wrapper {
		position: relative;
	} */
</style>
