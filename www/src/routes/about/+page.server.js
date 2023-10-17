import { parse as parseRss } from 'rss-to-json'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const { items } = await parseRss('https://letterboxd.com/stormwarning/rss/')
	const films = Object.values(items).slice(0, 4)

	films.map((film) => {
		film.cover = film.description.match(/img src="(.*(?="\/))/)[1]
		return film
	})

	return {
		films: new Promise((resolve) => {
			resolve(films)
		}),
	}
}
