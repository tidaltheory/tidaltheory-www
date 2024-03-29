import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({ postcss: true }),
		mdsvex({
			extensions: ['.md'],
		}),
	],

	extensions: ['.svelte', '.md'],

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
