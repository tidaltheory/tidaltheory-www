import { format } from 'date-fns'
import Prism from 'prismjs'

import { getCaseStudy } from '$lib/sanity/case-studies.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const post = await getCaseStudy(params.slug)

	post.startDateNice = format(new Date(post.startDate), 'MMMM yyyy')
	post.endDateNice = format(new Date(post.endDate), 'MMMM yyyy')

	for (const block of post.content) {
		if (block._type === 'code') {
			/**
			 * @todo Maybe look into highlightjs for "server-side" line
			 *       highlighting (Prism plugin only works on DOM).
			 */
			block.code = Prism.highlight(
				block.code,
				Prism.languages[block.language],
				block.language,
			)
		}
	}

	return {
		...post,
		createdAt: format(new Date(post._createdAt), 'dd MMMM yyyy'),
	}
}
