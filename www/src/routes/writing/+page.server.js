import { error } from '@sveltejs/kit'

import { getPosts } from '$lib/sanity/posts.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const posts = await getPosts()

	if (posts) return { posts }

	throw error(404, 'Not found.')
}
