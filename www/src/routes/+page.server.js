import { getUpdates } from '$lib/sanity/updates.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const updates = await getUpdates()

	if (updates) return { updates }
}
