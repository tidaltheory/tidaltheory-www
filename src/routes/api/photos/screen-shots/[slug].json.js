import { readFile } from 'fs/promises'
import { resolve } from 'path'

import { compile } from 'mdsvex'

import { library } from '../../../../../content/imagemeta.json'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
	const { slug } = params
	const md = await readFile(
		resolve('content', 'photos', 'screen-shots', `${slug}.md`)
	)
	const content = await compile(md)
	let images = []

	content?.data.fm.images.forEach((key) => images.push(library[key]))

	return {
		body: {
			...content.data.fm,
			content: content.code,
			images,
		},
	}
}
