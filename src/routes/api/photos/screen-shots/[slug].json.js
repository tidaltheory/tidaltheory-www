import { readFile } from 'fs/promises'
import { resolve } from 'path'

import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import { library } from '../../../../../content/imagemeta.json'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
	const { slug } = params
	const md = await readFile(
		resolve('content', 'photos', 'screen-shots', `${slug}.md`)
	)
	const { data, content } = matter(md)
	const processedContent = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(content)

	let images = []
	data.images.forEach((key) => images.push(library[key]))

	return {
		body: {
			data: {
				...data,
				content: processedContent.value,
				images,
			},
		},
	}
}
