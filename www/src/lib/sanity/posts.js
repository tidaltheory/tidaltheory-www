import groq from 'groq'

import { client } from './client.js'

/** @typedef {import('../../../../studio/sanity.config.js').SanityValues['post']} Post */

/**
 * @returns {Promise<Post[]>}
 */
export async function getPosts() {
	return await client.fetch(
		groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
	)
}

/**
 * @typedef {object} PostFields
 * @prop {string} ledeClean
 * @prop {string} coverImage
 */
/** @typedef {Post & PostFields} PostObject */

/**
 * @param {string} slug
 * @returns {Promise<PostObject>}
 */
export async function getPost(slug) {
	return await client.fetch(
		groq`*[_type == "post" && slug.current == $slug]{
			...,
			'ledeClean': pt::text(lede),
			'coverImage': cover->image.asset,
		}[0]`,
		{ slug },
	)
}
