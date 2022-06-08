import adapter from '@sveltejs/adapter-node';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			envPrefix: ''
		}),
		vite: {
			define: {
			  'process.env': process.env,
			},
		},
	},
	preprocess: [
		preprocess({
		  postcss: true,
		}),
	],
};

export default config;
