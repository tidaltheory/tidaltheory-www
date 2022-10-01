import { json } from '@sveltejs/kit'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

import { library } from '../../../../../../content/imagemeta.json'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
	const { slug } = params
	const md = await readFile(
		resolve('content', 'photos', 'screen-shots', `${slug}.md`)
	)
	const { data, content } = matter(md)
	const processedContent = await unified()
		.use(remarkParse)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeSanitize, {
			...defaultSchema,
			attributes: {
				...defaultSchema.attributes,
				span: [...(defaultSchema.attributes.span || []), ['className']],
			},
		})
		.use(rehypeStringify)
		.process(content)

	let images = []
	data.images.forEach((key) => {
		let image

		if (typeof key === 'string') {
			image = library[key]
		} else {
			let imgKey = key[Object.keys(key)]

			image = library[Object.keys(key)]
			image.meta = imgKey
		}

		images.push(image)
	})

	return json({
		...data,
		content: processedContent.value,
		images,
	})
}
