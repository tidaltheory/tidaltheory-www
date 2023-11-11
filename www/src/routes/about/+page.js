/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	let films = []

	try {
		films = await fetch('/.netlify/functions/letterboxd').then((response) =>
			response.json(),
		)
	} catch {}
	// Const films = await fetch('/.netlify/functions/letterboxd').then(
	// 	(response) => response.json(),
	// )

	return {
		streamed: {
			films,
		},
	}
}
