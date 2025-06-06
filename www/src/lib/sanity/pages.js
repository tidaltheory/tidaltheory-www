import groq from 'groq'

import { client } from './client.js'

/**
 * @param {string} slug
 * @returns {Promise<import('./types.js').PageQueryResult>}
 */
export async function getPage(slug) {
	let pageQuery = groq`*[_type == "page" && slug.current == $slug][0]`

	return await client.fetch(pageQuery, { slug })
}

/**
 * @param {string} slug
 * @returns {Promise<import('./types.js').ResumeQueryResult>}
 */
export async function getResume(slug) {
	let pageQuery = groq`*[_type == "resume" && slug.current == $slug][0]`

	return await client.fetch(pageQuery, { slug })
}
