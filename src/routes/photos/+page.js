export const load = async ({ fetch }) => {
	const res = await fetch('/api/photos.json')
	const data = await res.json()

	return {
		json: data,
	}
}
