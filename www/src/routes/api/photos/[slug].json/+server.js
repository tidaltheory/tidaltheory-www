import { resolve } from 'node:path'

import { json } from '@sveltejs/kit'

import { loadGalleryPage } from '$lib/load-gallery-page.js'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
	const { slug } = params
	const pageObject = await loadGalleryPage(
		resolve('content', 'photos', `${slug}.md`),
	)

	return json(pageObject)
}
