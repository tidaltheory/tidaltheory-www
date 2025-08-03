import { format } from 'date-fns'

import { getCaseStudies } from '$lib/sanity/case-studies.js'
import { getPage } from '$lib/sanity/pages.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const page = await getPage('work')
	const cases = await getCaseStudies()

	for (const item of cases) {
		item.startDateNice = format(new Date(item.startDate), 'MMM yyyy')
		item.endDateNice = format(new Date(item.endDate), 'MMM yyyy')
	}

	return {
		...page,
		cases,
	}
}
