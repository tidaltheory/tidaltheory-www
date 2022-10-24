export const load = async ({ params, fetch }) => {
	const result = await fetch(`/api/photos/${params.slug}.json`)
	const data = await result.json()

	return {
		json: data,
	}
}
