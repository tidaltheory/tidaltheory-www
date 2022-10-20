import { parse } from 'node:path'

import { json } from '@sveltejs/kit'

import { library } from '../../../../content/imagemeta.json'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
	const allPostFiles = import.meta.glob('../../../../content/photos/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			const postPath = `/photos/${parse(path).name}`

			return {
				meta: metadata,
				path: postPath,
				coverImage: library[metadata.cover],
			}
		})
	)

	// Const sortedPosts = allPosts.sort((a, b) => {
	// 	return new Date(b.meta.date) - new Date(a.meta.date)
	// })

	return json(allPosts)
}
