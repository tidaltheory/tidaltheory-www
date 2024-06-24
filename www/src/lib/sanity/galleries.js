import groq from 'groq'

import { client } from './client.js'

/**
 * @returns {Promise<import('./types.js').GalleriesQueryResult>}
 */
export async function getGalleries() {
	let galleriesQuery = groq`
		*[_type == "gallery" && defined(slug.current)]{
			_updatedAt,
			slug,
			title,
			subtitle,
			'fullTitle': select(
				subtitle != null => array::join([title, subtitle], ' '),
				title
			),
			'coverImage': cover->image.asset,
			'coverImageMeta': cover->image.asset->metadata,
			'coverImageHotspot': cover->image.hotspot,
			images,
			'count': count(images),
		} | order(_updatedAt desc)`

	return await client.fetch(galleriesQuery)
}

/**
 * @returns {Promise<import('./types.js').GalleriesQueryResult>}
 */
export async function getCategoryGalleries(category) {
	let categoryGalleriesQuery = groq`
		*[_type == "gallery" && category == $category && defined(slug.current)]{
			_updatedAt,
			slug,
			title,
			subtitle,
			'fullTitle': select(
				subtitle != null => array::join([title, subtitle], ' '),
				title
			),
			'coverImage': cover->image.asset,
			'coverImageMeta': cover->image.asset->metadata,
			'coverImageHotspot': cover->image.hotspot,
			images,
			'count': count(images),
		} | order(_updatedAt desc)`

	return await client.fetch(categoryGalleriesQuery, { category })
}

/**
 * @param {string} slug
 * @returns {Promise<import('./types.js').GalleryQueryResult>}
 */
export async function getGallery(slug) {
	let galleryQuery = groq`
		*[_type == "gallery" && slug.current == $slug]{
			...,
			'fullTitle': select(
				subtitle != null => array::join([title, subtitle], ' '),
				title
			),
			'ledeClean': pt::text(lede),
			'coverImage': cover->image.asset,
			'coverImageMeta': cover->image.asset->metadata,
			images[]->{
				...,
				'metadata': image.asset->metadata
			},
		}[0]`

	return await client.fetch(galleryQuery, { slug })
}

/**
 * @returns {Promise<import('./types.js').LatestScreenShotGalleryQueryResult>}
 */
export async function getLatestScreenShotGallery() {
	let latestScreenShotGalleryQuery = groq`
		*[_type == "gallery" && category == 'screen-shots']{
			_updatedAt,
			'coverImage': cover->image.asset,
			'coverImageMeta': cover->image.asset->metadata,
			'coverImageHotspot': cover->image.hotspot,
		} | order(_updatedAt desc)[0]`

	return await client.fetch(latestScreenShotGalleryQuery)
}
