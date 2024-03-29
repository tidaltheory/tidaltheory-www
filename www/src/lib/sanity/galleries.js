import groq from 'groq'

import { client } from './client.js'

/** @typedef {import('../../../../studio/sanity.config.js').SanityValues['gallery']} Gallery */

/**
 * These are the props added during server-side serialisation.
 * @typedef {object} ExtraProps
 * @property {string} fullTitle
 * @property {number} count
 * @property {any} coverImageSet
 * @property {any} coverImageMeta
 * @property {any} coverImageHotspot
 */
/** @typedef {Gallery & ExtraProps} GalleryCardObject */

/**
 * @returns {Promise<GalleryCardObject[]>}
 */
export async function getGalleries() {
	return await client.fetch(
		groq`*[_type == "gallery" && defined(slug.current)]{
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
		} | order(_updatedAt desc)`,
	)
}

/**
 * @returns {Promise<GalleryCardObject[]>}
 */
export async function getCategoryGalleries(category) {
	return await client.fetch(
		groq`*[_type == "gallery" && category == $category && defined(slug.current)]{
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
		} | order(_updatedAt desc)`,
		{ category },
	)
}

/**
 * @typedef {object} GalleryFields
 * @prop {string} fullTitle
 * @prop {string} ledeClean
 * @prop {string} coverImage
 */
/** @typedef {Gallery & GalleryFields} GalleryPostObject */

/**
 * @param {string} slug
 * @returns {Promise<GalleryPostObject>}
 */
export async function getGallery(slug) {
	return await client.fetch(
		groq`*[_type == "gallery" && slug.current == $slug]{
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
		}[0]`,
		{ slug },
	)
}

export async function getLatestScreenShotGallery() {
	return await client.fetch(
		groq`*[_type == "gallery" && category == 'screen-shots']{
			_updatedAt,
			'coverImage': cover->image.asset,
			'coverImageMeta': cover->image.asset->metadata,
			'coverImageHotspot': cover->image.hotspot,
		} | order(_updatedAt desc)[0]`,
	)
}
