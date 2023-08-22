import { error } from '@sveltejs/kit'

import { getCategoryGalleries } from '$lib/sanity/galleries.js'
import { getImageUrl } from '$lib/sanity/image.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const galleries = await getCategoryGalleries('screen-shots')

	if (galleries) {
		for (const set of galleries) {
			set.coverImageSet = {
				sm: getImageUrl(set.coverImage, 300, 250, 'webp'),
				md: getImageUrl(set.coverImage, 600, 500, 'webp'),
				lg: getImageUrl(set.coverImage, 1200, 1000, 'webp'),
			}
		}

		return { galleries }
	}

	throw error(404, 'Not found.')
}
