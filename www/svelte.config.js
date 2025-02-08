import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({ postcss: true })],

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
