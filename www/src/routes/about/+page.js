/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	const films = await fetch('/.netlify/functions/letterboxd')
	console.log('FILMS', await films.text())

	return {
		films: [],
	}
}
