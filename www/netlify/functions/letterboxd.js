import Parser from 'rss-parser'

/**
 * @param {Request} request
 * @param {import('@netlify/functions').Context} context
 */
async function handler(_request, _context) {
	const { parseURL } = new Parser({})
	const feed = await parseURL('https://letterboxd.com/stormwarning/rss/')

	const films = Object.values(feed).slice(0, 4)

	films.map((film) => {
		film.cover = film.description.match(/img src="(.*(?="\/))/)[1]
		return film
	})

	return Response.json(films)
}

export default handler
