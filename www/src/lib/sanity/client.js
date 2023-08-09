import { createClient } from '@sanity/client'
import groq from 'groq'

import {
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_PROJECT_ID,
	// eslint-disable-next-line import/extensions
} from '$env/static/public'

/** @typedef {import('@portabletext/types').PortableTextBlock} PortableTextBlock */
/** @typedef {import('@sanity/types').Slug} Slug */
/** @typedef {import('@sanity/types').ImageAsset} ImageAsset */

/**
 * @typedef {object} Note
 * @prop {'note'} _type
 * @prop {string} _createdAt
 * @prop {string} [title]
 * @prop {Slug} slug
 * @prop {Array<PortableTextBlock>} content
 */

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?')
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2023-03-20', // Date of setup
})

/**
 * @returns {Promise<Note[]>}
 */
export async function getNotes() {
	return await client.fetch(
		groq`*[_type == "note" && defined(slug.current)] | order(_createdAt desc)`,
	)
}

/**
 * @param {string} slug
 * @returns {Promise<Note>}
 */
export async function getNote(slug) {
	return await client.fetch(
		groq`*[_type == "note" && slug.current == $slug][0]`,
		{ slug },
	)
}
