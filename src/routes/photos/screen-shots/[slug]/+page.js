export const load = async ({ params, fetch }) => {
	const result = await fetch(`/api/photos/screen-shots/${params.slug}.json`)
	const data = await result.json()

	return {
		json: data,
	}
}
