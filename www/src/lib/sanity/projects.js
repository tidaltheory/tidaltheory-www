import groq from 'groq'

import { client } from './client.js'

/**
 * @returns {Promise<import('./types.js').ProjectsQueryResult>}
 */
export async function getProjects() {
	let projectsQuery = groq`*[_type == "project"] | order(_createdAt desc)`

	return await client.fetch(projectsQuery)
}
