import { AtpAgent } from '@atproto/api'

import { PUBLICATION_URI } from '../../src/lib/at-proto.js'

const COLLECTION = 'site.standard.document'

const ALLOWED_ORIGINS = [
	'http://localhost:3333',
	'https://tidaltheory.sanity.studio',
]

/**
 * Build CORS headers for an allowed Studio origin.
 *
 * @param {string | null} origin
 */
function corsHeaders(origin) {
	const allowed =
		origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
	return {
		'Access-Control-Allow-Origin': allowed,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'content-type',
	}
}

/**
 * Convert a `YYYY-MM-DD` date to an ISO datetime string.
 *
 * @param {string} date
 */
function toDateTime(date) {
	return new Date(`${date}T00:00:00.000Z`).toISOString()
}

/**
 * Mirror a published `post` into a `site.standard.document` AT proto record.
 *
 * @param {Request} request
 * @param {import('@netlify/functions').Context} context
 */
async function atProtoDocument(request, _context) {
	const origin = request.headers.get('origin')
	const headers = corsHeaders(origin)

	if (request.method === 'OPTIONS') {
		return new Response(null, { status: 204, headers })
	}

	if (request.method !== 'POST') {
		return Response.json(
			{ error: 'Method not allowed' },
			{ status: 405, headers },
		)
	}

	try {
		const { title, slug, published, edited, description, atUri } =
			await request.json()

		const agent = new AtpAgent({ service: 'https://bsky.social' })
		await agent.login({
			identifier: process.env.ATPROTO_IDENTIFIER,
			password: process.env.ATPROTO_APP_PASSWORD,
		})

		const record = {
			$type: COLLECTION,
			site: PUBLICATION_URI,
			title,
			publishedAt: toDateTime(published),
		}

		if (slug) record.path = `/writing/${slug}`
		if (description) record.description = description
		if (edited) record.updatedAt = toDateTime(edited)

		let result
		if (atUri) {
			result = await agent.com.atproto.repo.putRecord({
				repo: agent.did,
				collection: COLLECTION,
				rkey: atUri.split('/').pop(),
				record,
			})
		} else {
			result = await agent.com.atproto.repo.createRecord({
				repo: agent.did,
				collection: COLLECTION,
				record,
			})
		}

		return Response.json({ atUri: result.data.uri }, { headers })
	} catch (error) {
		return Response.json(
			{ error: error instanceof Error ? error.message : String(error) },
			{ status: 500, headers },
		)
	}
}

export default atProtoDocument
