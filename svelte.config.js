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
	files: {
		assets: 'static',
		hooks: 'src/hooks',
		lib: 'src/lib',
		params: 'src/params',
		routes: 'src/routes',
		serviceWorker: 'src/service-worker',
		template: 'src/app.html'
	},
	paths: {
		assets: '',
		base: ''
	},
	preprocess: [
		preprocess({
		  postcss: true,
		}),
	],
};

export default config;
