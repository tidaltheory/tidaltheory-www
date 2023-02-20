import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import TOML from '@iarna/toml'
import { format } from 'date-fns'
import matter from 'gray-matter'

import { processMarkdown } from '$lib/process-markdown.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const md = await readFile(resolve('content', 'notes', `${params.slug}.md`))
	const { content, matter: toml } = matter(md, {
		delimiters: '+++',
		engines: {
			toml: TOML.parse.bind(TOML),
		},
	})

	const { date } = TOML.parse(toml)
	const title = format(new Date(date), 'dd MMMM yyyy, h:mm aaa')

	return {
		content: await processMarkdown(content),
		title,
	}
}
