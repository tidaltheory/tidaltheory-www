import { parse } from 'node:path'

import { library } from '../../content/imagemeta.json'

/**
 * @param {Record<string, () => Promise<unknown>>} postFiles
 * @param {string} subDirectory
 */
export async function loadGalleries(postFiles, subDirectory = '') {
	const allPosts = await Promise.all(
		Object.entries(postFiles).map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			const postPath = `/photos/${subDirectory}${parse(path).name}`

			return {
				meta: metadata,
				path: postPath,
				coverImage: library[metadata.cover],
				updated: new Date(metadata.updated).getTime(),
			}
		}),
	)

	return allPosts.sort((a, b) => b.updated - a.updated)
}
