/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	let films = new Response([])

	try {
		films = await fetch('/.netlify/functions/letterboxd')
	} catch {}
	// Const films = await fetch('/.netlify/functions/letterboxd').then(
	// 	(response) => response.json(),
	// )

	return {
		streamed: {
			films: films.json(),
		},
	}
}
