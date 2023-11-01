import parseRss from 'rss-to-json'

/**
 * @param {Request} request
 * @param {import('@netlify/functions').Context} context
 */
async function letterboxd(_request, _context) {
	// Const { parseURL } = new Parser({})
	// const feed = await parseURL('https://letterboxd.com/stormwarning/rss/')
	const feed = await fetch('https://letterboxd.com/stormwarning/rss/').then(
		async (response) => {
			console.log('RESPONSE', response)
			return await parseRss.parse(await response.text())
		},
	)

	console.log('PARSED', feed)
	// Add filter for only watched films (no lists, etc.) check for `letterboxed:watchedDate`.
	// const films = Object.values(feed).slice(0, 4)
	// films.map((film) => {
	// 	film.cover = film.description.match(/img src="(.*(?="\/))/)[1]
	// 	return film
	// })

	return Response.json({ placeholder: 'data' })
}

export default letterboxd
