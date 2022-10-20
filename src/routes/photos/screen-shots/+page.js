export const load = async ({ fetch }) => {
	const result = await fetch('/api/screen-shots.json')
	const data = await result.json()

	return {
		json: data,
	}
}
