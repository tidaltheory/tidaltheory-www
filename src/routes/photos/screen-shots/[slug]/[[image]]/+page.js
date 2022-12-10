/** @type {import('../$types').PageLoad} */
export const load = async ({ route, params, fetch }) => {
	const cleanUrl = route.id
		.replace('[slug]', params.slug)
		.replace('[[image]]', '')
	const result = await fetch(`/api/photos/screen-shots/${params.slug}.json`)
	const data = await result.json()

	return {
		json: data,
		params,
		cleanUrl,
	}
}
