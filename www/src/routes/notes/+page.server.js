import { error } from '@sveltejs/kit'

import { getNotes } from '$lib/sanity/client.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const notes = await getNotes()

	if (notes) return { notes }

	throw error(404, 'Not found.')
}
