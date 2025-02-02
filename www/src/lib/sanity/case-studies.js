import groq from 'groq'

import { client } from './client.js'

/**
 * @returns {Promise<import('./types.js').CaseStudiesQueryResult>}
 */
export async function getCaseStudies() {
	let caseStudiesQuery = groq`*[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc)`

	return await client.fetch(caseStudiesQuery)
}

/**
 * @param {string} slug
 * @returns {Promise<import('./types.js').CaseStudyQueryResult>}
 */
export async function getCaseStudy(slug) {
	let caseStudyQuery = groq`
		*[_type == "caseStudy" && slug.current == $slug]{
			...,
			'ledeClean': pt::text(lede),
			// 'coverImage': cover->image.asset,
		}[0]`

	return await client.fetch(caseStudyQuery, { slug })
}
