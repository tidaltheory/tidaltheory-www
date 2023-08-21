import { error } from '@sveltejs/kit'

import {
	getCategoryGalleries,
	getLatestScreenShotGallery,
} from '$lib/sanity/galleries.js'
import { getImageUrl } from '$lib/sanity/image.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const screenShotCover = await getLatestScreenShotGallery()
	const otherGalleries = await getCategoryGalleries('photo-series')

	let galleries = []

	if (screenShotCover) {
		galleries.push({
			...screenShotCover,
			slug: { current: 'screen-shots' },
			fullTitle: 'Screen Shots',
			coverImageSet: {
				sm: getImageUrl(screenShotCover.coverImage, 300, 250, 'webp'),
				md: getImageUrl(screenShotCover.coverImage, 600, 500, 'webp'),
				lg: getImageUrl(screenShotCover.coverImage, 1200, 1000, 'webp'),
			},
		})
	}

	if (otherGalleries) {
		for (const set of otherGalleries) {
			set.coverImageSet = {
				sm: getImageUrl(set.coverImage, 300, 250, 'webp'),
				md: getImageUrl(set.coverImage, 600, 500, 'webp'),
				lg: getImageUrl(set.coverImage, 1200, 1000, 'webp'),
			}
			galleries.push(set)
		}
	}

	if (galleries.length > 0) return { galleries }

	throw error(404, 'Not found.')
}
