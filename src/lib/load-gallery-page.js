import { readFile } from 'node:fs/promises'

import matter from 'gray-matter'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

import { library } from '../../content/imagemeta.json'

/**
 * @param {string} path
 */
export async function loadGalleryPage(path) {
	const md = await readFile(path)
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
	const cleanIntro = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(data.description)

	let images = []
	for (const key of data.images) {
		let image

		if (typeof key === 'string') {
			image = library[key]
		} else {
			let imgKey = key[Object.keys(key)]

			image = library[Object.keys(key)]

			if (!image.meta) image.meta = imgKey
		}

		images.push(image)
	}

	return {
		...data,
		content: processedContent.value,
		images,
		coverImage: library[data.cover].thumbnails['gallery-lg'].path.replace(
			/^static/,
			''
		),
		cleanIntro: cleanIntro.value.replace('<p>', '').replace('</p>', ''),
	}
}
