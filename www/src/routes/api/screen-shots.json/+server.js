import { json } from '@sveltejs/kit'

import { loadGalleries } from '$lib/load-galleries.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
	const postFiles = import.meta.glob(
		'../../../../content/photos/screen-shots/*.md',
	)
	const galleryObjects = await loadGalleries(postFiles, 'screen-shots/')

	return json(galleryObjects)
}
