import groq from 'groq'

import { client } from './client.js'

/**
 * @param {string} slug
 * @returns {Promise<Page>}
 */
export async function getPage(slug) {
	return await client.fetch(
		groq`*[_type == "page" && slug.current == $slug][0]`,
		{ slug },
	)
}
