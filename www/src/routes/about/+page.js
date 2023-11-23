/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	let books = await fetch('/api/books.json')
	let films = Response.json([])

	try {
		films = await fetch(
			'https://tidaltheory.io/.netlify/functions/letterboxd',
		).then((response) => response.json())
	} catch (error) {
		console.log('PageLoad error:', error)
	}

	return {
		books: await books.json(),
		streamed: {
			films: new Promise((resolve) => {
				resolve(films)
			}),
		},
	}
}
