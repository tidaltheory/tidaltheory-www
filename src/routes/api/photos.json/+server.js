import { json } from '@sveltejs/kit'

import { loadGalleries } from '$lib/load-galleries.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
	const postFiles = import.meta.glob('../../../../content/photos/*.md')
	const galleryObjects = await loadGalleries(postFiles)

	return json(galleryObjects)
}
