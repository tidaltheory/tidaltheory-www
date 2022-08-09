import { library } from '../../../content/imagemeta.json'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
	const allPostFiles = import.meta.glob('../../../content/photos/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			const postPath = path.slice(16, -3)

			// console.log('COVER', metadata.cover)
			// console.log(library[metadata.cover])
			return {
				meta: metadata,
				path: postPath,
				coverImage: library[metadata.cover],
			}
		})
	)

	// const sortedPosts = allPosts.sort((a, b) => {
	// 	return new Date(b.meta.date) - new Date(a.meta.date)
	// })

	return {
		body: allPosts,
	}
}
