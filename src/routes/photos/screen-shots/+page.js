export const load = async ({ fetch }) => {
	const res = await fetch('/api/screen-shots.json')
	const data = await res.json()

	return {
		json: data,
	}
}
