import path from 'path';
// import houdini from 'houdini-preprocess';
// import node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import houdini from 'houdini-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess(), houdini()],
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		// adapter: node(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// browser: true,
		vite: {
			resolve: {
				alias: {
					$houdini: path.resolve('.', '$houdini')
				}
			}
		}
	},
	// plugins:[
	// 	svelte({
	// 		preprocess:[houdini()],
	// 	})
	// ]
};

export default config;
