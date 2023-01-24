import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import TOML from '@iarna/toml'
import matter from 'gray-matter'

import { library } from '../../content/imagemeta.json'

async function getGalleryUpdate(update) {
	const md = await readFile(resolve('content', 'photos', `${update.slug}.md`))
	const { data } = matter(md)
	const galleryImages = data.images.slice(0, 4)

	update.title = data.subtitle
		? [data.title, data.subtitle].join(' ')
		: data.title

	let images = []
	for await (const key of galleryImages) {
		let image = library[key]
		image.key = key.match(/\d{14}/)[0]
		images.push(image)
	}

	update.images = images

	return update
}

async function getPostUpdate(update) {
	const toml = TOML.parse(
		await readFile(resolve('content', 'writing', `${update.slug}.toml`))
	)

	update.title = toml.title
	update.excerpt = toml.excerpt

	return update
}

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	let toml = TOML.parse(await readFile(resolve('content', 'updates.toml')))
	let parsedUpdates = []

	for await (const update of toml.updates) {
		switch (update._type) {
			case 'gallery-add':
			case 'gallery-update':
				parsedUpdates.push(await getGalleryUpdate(update))
				continue

			case 'post-add':
				// Get post title
				// Get post cover image
				// Get post excerpt
				// Add to object
				parsedUpdates.push(await getPostUpdate(update))
				continue

			default:
				continue
		}
	}

	return {
		updates: JSON.parse(JSON.stringify(parsedUpdates)),
	}
}
