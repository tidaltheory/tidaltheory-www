export const load = async ({ fetch }) => {
	const result = await fetch('/api/screen-shots.json')
	const data = await result.json()

	const recentGalleries = data
		.sort((a, b) => b.updated - a.updated)
		.slice(0, 2)

	return {
		json: {
			recentGalleries,
		},
	}
}
