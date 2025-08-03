import { format } from 'date-fns'

import { getResume } from '$lib/sanity/pages.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const page = await getResume('resume')

	for (const item of page.previousRoles) {
		item.start = format(new Date(item.start), 'MMM yyyy')
		item.end = format(new Date(item.end), 'MMM yyyy')
	}

	return page
}
