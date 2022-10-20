export const load = async ({ fetch }) => {
	const result = await fetch('/api/photos.json')
	const data = await result.json()

	return {
		json: data,
	}
}
