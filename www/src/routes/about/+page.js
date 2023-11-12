/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	let films = []

	try {
		films = await fetch(
			'https://deploy-preview-150--tidaltheory.netlify.app/.netlify/functions/letterboxd',
		).then((response) => response.json())
	} catch (error) {
		console.log('PageLoad error:', error)
	}

	return {
		streamed: {
			films: new Promise((resolve) => {
				resolve(films)
			}),
		},
	}
}
