import groq from 'groq'

import { client } from './client.js'

/**
 * @returns {Promise<import('./types.js').NotesQueryResult>}
 */
export async function getNotes() {
	let notesQuery = groq`*[_type == "note" && defined(slug.current)] | order(_createdAt desc)`

	return await client.fetch(notesQuery)
}

/**
 * @param {string} slug
 * @returns {Promise<import('./types.js').NoteQueryResult>}
 */
export async function getNote(slug) {
	let noteQuery = groq`*[_type == "note" && slug.current == $slug][0]`

	return await client.fetch(noteQuery, { slug })
}
