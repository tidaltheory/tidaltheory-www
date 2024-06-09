import groq from 'groq'

import { client } from './client.js'

/**
 * @returns {Promise<import('./types.js').PostsQueryResult>}
 */
export async function getPosts() {
	let postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

	return await client.fetch(postsQuery)
}

/**
 * @param {string} slug
 * @returns {Promise<import('./types.js').PostQueryResult>}
 */
export async function getPost(slug) {
	let postQuery = groq`
		*[_type == "post" && slug.current == $slug]{
			...,
			'ledeClean': pt::text(lede),
			'coverImage': cover->image.asset,
		}[0]`

	return await client.fetch(postQuery, { slug })
}
