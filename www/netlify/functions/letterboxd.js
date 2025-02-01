import parseRss from 'rss-to-json'

/**
 * @param {Request} request
 * @param {import('@netlify/functions').Context} context
 */
async function letterboxd(_request, _context) {
	const feed = await parseRss.parse('https://letterboxd.com/stormwarning/rss/')
	// Add filter for only watched films (no lists, etc.) check for `letterboxed:watchedDate`.
	const films = Object.values(feed.items)
		.filter((item) => item.id.match(/letterboxd-(watch|review)-/))
		.slice(0, 4)

	films.map((film) => {
		film.cover = film.description.match(/img src="(.*(?="\/))/)[1]
		return film
	})

	return Response.json(films)
}

export default letterboxd
