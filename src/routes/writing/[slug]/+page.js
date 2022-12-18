/** @type {import('./$types').PageLoad} */
export const load = async ({ params, fetch }) => {
	const result = await fetch(`/api/writing/${params.slug}.json`)
	const { cleanIntro, ...data } = await result.json()

	return {
		page: data,
		cleanIntro,
	}
}
