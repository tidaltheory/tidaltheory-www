import { getResume } from '$lib/sanity/pages.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const page = await getResume('resume')

	return page
}
