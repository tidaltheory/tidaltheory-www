/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	const films = await fetch('/.netlify/functions/letterboxd')
	console.log('FILMS', films)

	return {
		films: await films.json(),
	}
}
