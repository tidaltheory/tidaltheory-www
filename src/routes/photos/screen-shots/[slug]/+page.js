export const load = async ({ params, fetch }) => {
	const res = await fetch(`/api/photos/screen-shots/${params.slug}.json`)
	const data = await res.json()

	return {
		json: data,
	}
}
