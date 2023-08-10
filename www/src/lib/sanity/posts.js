import groq from 'groq'

import { client } from './client.js'

/**
 * @returns {Promise<Post[]>}
 */
export async function getPosts() {
	return await client.fetch(
		groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
	)
}

/**
 * @param {string} slug
 * @returns {Promise<Post>}
 */
export async function getPost(slug) {
	return await client.fetch(
		groq`*[_type == "post" && slug.current == $slug][0]`,
		{ slug },
	)
}
