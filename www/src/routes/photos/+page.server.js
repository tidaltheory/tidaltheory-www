import { error } from '@sveltejs/kit'

import { getGalleries } from '$lib/sanity/galleries.js'
import { urlFor } from '$lib/sanity/image.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const galleries = await getGalleries()

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

/**
 *
 * @param {any} image
 * @param {number} width
 * @param {number} height
 * @param {'jpg' | 'webp'} format
 * @returns {string}
 */
function getImageUrl(image, width, height, format) {
	return urlFor(image).width(width).height(height).format(format).url()
}
