import { getPage } from '$lib/sanity/pages.js'
import { getProjects } from '$lib/sanity/projects.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const page = await getPage('projects')
	const projects = await getProjects()

	return {
		...page,
		projects,
	}
}
