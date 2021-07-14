<script context="module">
	import env from '../environment';
	import { setEnvironment } from '$houdini';

	setEnvironment(env);
</script>

<script>
	import NavBar from '../components/navbar/NavBar.svelte';

	// import ApolloClient from 'apollo-boost';
	// import { setClient } from 'svelte-apollo';

	// const uri = `http://localhost:4300/graphql`;

	// const client = new ApolloClient({
	// 	uri: uri,
	// 	onError: ({ networkError, graphQLErrors }) => {
	// 		console.log('--------graphQLErrors offline----------111111111111111111');
	// 		console.log(graphQLErrors);
	// 		console.log(networkError);
	// 		console.log('--------graphQLErrors offline----------222222222222');
	// 	}
	// });

	// setClient(client);
</script>

<!-- <script>
</script> -->

<div class="container">
	<NavBar />
</div>
<slot />

<style>
	.container {
		margin: 0 auto;
		padding: 10px;
		display: flex;
		justify-content: center;
	}
</style>
