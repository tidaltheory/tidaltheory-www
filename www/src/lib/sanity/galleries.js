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
			images,
			'count': count(images),
		} | order(_updatedAt desc)`,
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
			images[]->{
				...,
				'metadata': image.asset->metadata
			},
		}[0]`,
		{ slug },
	)
}
