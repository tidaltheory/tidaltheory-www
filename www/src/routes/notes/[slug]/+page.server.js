import { format } from 'date-fns'

import { getNote } from '$lib/sanity/client.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const note = await getNote(params.slug)

	return {
		...note,
		title: format(new Date(note._createdAt), 'dd MMMM yyyy, h:mm aaa'),
	}
}
