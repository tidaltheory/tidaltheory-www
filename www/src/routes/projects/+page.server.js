import { getPage } from '$lib/sanity/pages.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const page = await getPage('projects')

	return {
		...page,
	}
}
