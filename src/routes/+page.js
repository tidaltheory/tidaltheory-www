export const load = async ({ fetch }) => {
	const res = await fetch('/api/screen-shots.json')
	const data = await res.json()

	const recentGalleries = data
		.sort((a, b) => b.updated - a.updated)
		.slice(0, 2)

	return {
		json: {
			recentGalleries,
		},
	}
}
