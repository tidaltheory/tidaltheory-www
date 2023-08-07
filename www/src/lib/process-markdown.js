import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export async function processMarkdown(markdown) {
	const { value } = await unified()
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
		.process(markdown)

	return value
}
