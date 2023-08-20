import { error } from '@sveltejs/kit'

import { getYear } from 'date-fns'

import { getPosts } from '$lib/sanity/posts.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const posts = await getPosts()

	if (posts) {
		const postsByYear = new Map()

		for (const post of posts) {
			const date = new Date(post._createdAt)
			const year = getYear(date)

			if (!postsByYear.has(year)) postsByYear.set(year, new Set())

			postsByYear.get(year).add(post)
		}

		return { posts: postsByYear }
	}

	throw error(404, 'Not found.')
}
