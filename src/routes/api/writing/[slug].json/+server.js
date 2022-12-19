import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { json } from '@sveltejs/kit'

import TOML from '@iarna/toml'

import { processMarkdown } from '$lib/process-markdown.js'

import { library } from '../../../../../content/imagemeta.json'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ params }) => {
	let { slug } = params
	let toml = TOML.parse(
		await readFile(resolve('content', 'writing', `${slug}.toml`))
	)
	let coverImage = toml.cover
		? library[toml.cover].thumbnails['gallery-lg'].path.replace(
				/^static/,
				''
		  )
		: undefined

	for await (let block of toml.blocks) {
		switch (block.type) {
			case 'markdown':
				block.content = await processMarkdown(block.markdown)
				break

			case 'image':
				block.image = library[block.key]
				break

			default:
				break
		}
	}

	return json({
		...toml,
		coverImage,
	})
}
