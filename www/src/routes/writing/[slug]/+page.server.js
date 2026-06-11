import { format } from 'date-fns'
import Prism from 'prismjs'

import { urlFor } from '$lib/sanity/image.js'
import { getPost } from '$lib/sanity/posts.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const post = await getPost(params.slug)

	for (const block of post.content) {
		if (block._type === 'code') {
			/**
			 * @todo Maybe look into highlightjs for "server-side" line
			 *       highlighting (Prism plugin only works on DOM).
			 */
			block.code = Prism.highlight(
				block.code,
				Prism.languages[block.language ?? 'text'],
				block.language,
			)
		}
	}

	post.coverImage = urlFor(post.coverImage).format('jpg').url()

	return {
		...post,
		slug: post.slug.current,
		publishedOn: format(new Date(post.published), 'dd MMMM yyyy'),
		editedOn:
			post.edited === post.published
				? undefined
				: format(new Date(post.edited), 'dd MMMM yyyy'),
	}
}
