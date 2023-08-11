import Prism from 'prismjs'

import { getPost } from '$lib/sanity/posts.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const post = await getPost(params.slug)

	for (const block of post.content) {
		if (block._type === 'code') {
			block.code = Prism.highlight(
				block.code,
				Prism.languages[block.language],
				block.language,
			)
		}
	}

	return {
		...post,
	}
}
