<!-- <script context="module">
	import env from '../environment';
	import { setEnvironment } from '$houdini';
	setEnvironment(env);
</script> -->
<script>
	import { flagLangs, langsArr } from '../stores/langs/langStore';
	// import NavBar from '../components/navbar/NavBar.svelte';
	import FullScreenModal from '../components/full-screen-modal/FullScreenModal.svelte';
	import MainsideBar from '../components/MainsideBar.svelte';
	import Preloader from '../components/preloader/Preloader.svelte';
	import Footer from '../shareds/Footer.svelte';
	import Headers from '../shareds/Headers.svelte';
	import { CookiesHelper } from '../libs/helper-classes';

	import { getStores } from '$app/stores';
	getStores().session.subscribe((store) => {
		const cookieshelper = new CookiesHelper();
		console.log('storeXXXXXXXXXX: ', cookieshelper.getCookie('ULANG', store));
	});

	// import { ApolloClient } from 'apollo-boost';
	// import { setClient } from 'svelte-apollo';
	// const uri = `http://localhost:4300/graphql`;

	console.log('-------LAYOUT PRICIPAL---------111111111111111111');

	// const client = new ApolloClient({
	// 	uri: uri,
	// 	onError: ({ networkError, graphQLErrors }) => {
	// 		console.log(graphQLErrors);
	// 		console.log(networkError);
	// 		console.log('--------graphQLErrors offline----------222222222222');
	// 	}
	// });

	// setClient(client);
</script>

<!-- <script>
</script> -->

<!-- <div class="container">
	<NavBar />
</div> -->

<div class="wrapper">
	<Preloader />
	<MainsideBar />
	<Headers />
	<slot />
	<Footer />
	<FullScreenModal />
</div>

<!-- <style>
	 .containerzzzz {
		margin: 0 auto;
		padding: 10px;
		display: flex;
		justify-content: center;
	} 
</style> -->
<style>
	/* your styles go here */
	.wrapper {
		position: relative;
	}
</style>
