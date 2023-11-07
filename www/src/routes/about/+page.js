/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	const films = await fetch('/.netlify/functions/letterboxd').then(
		(response) => response.json(),
	)

	return {
		streamed: {
			films,
		},
	}
}
