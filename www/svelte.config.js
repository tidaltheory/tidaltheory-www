import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	extensions: ['.svelte'],

	kit: {
		adapter: adapter({
			split: false,
		}),
		prerender: {
			entries: ['*', '/photos', '/about'],
			handleHttpError: 'warn',
		},
	},
}

export default config
