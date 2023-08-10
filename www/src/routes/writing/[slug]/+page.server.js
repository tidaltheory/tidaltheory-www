import { getPost } from '$lib/sanity/posts.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const post = await getPost(params.slug)

	return {
		...post,
	}
}
