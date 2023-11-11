/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	let films = []

	try {
		films = await fetch('/.netlify/functions/letterboxd').then((response) =>
			response.json(),
		)
	} catch (error) {
		console.log('PageLoad error:', error)
	}

	return {
		streamed: {
			films,
		},
	}
}
