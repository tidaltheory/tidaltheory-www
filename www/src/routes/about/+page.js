/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	const films = await fetch('/.netlify/functions/letterboxd')

	return {
		films: films ? await films.json() : [],
	}
}
