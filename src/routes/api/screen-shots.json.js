import { library } from '../../../content/imagemeta.json'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
	const allPostFiles = import.meta.glob(
		'../../../content/photos/screen-shots/*.md'
	)
	const iterablePostFiles = Object.entries(allPostFiles)

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			const postPath = path.slice(16, -3)

			// console.log('COVER', metadata.cover)
			return {
				meta: metadata,
				path: postPath,
				coverImage: library[metadata.cover],
			}
		})
	)

	return {
		body: allPosts,
	}
}
