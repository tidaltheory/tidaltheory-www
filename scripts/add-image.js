#!/usr/bin/env node

import { exec, execSync } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { parse } from 'node:path'
import { parseArgs } from 'node:util'

import TOML from '@iarna/toml'

const options = {
	old: {
		type: 'boolean',
		short: 'o',
	},
}
const { values, positionals } = parseArgs({ options, strict: false })
const image = positionals[0]
const { dir, name } = parse(image)

/**
 * Generate thumbnails for image.
 */
await exec(`lens add ${image} --store content/imagemeta.json`)

/**
 * Get metadata from image.
 */

/** The image's IPTC title. */
const title = execSync(`exiftool -ObjectName -s3 ${image}`).toString()
/** The image's IPTC description. */
const caption = execSync(`exiftool -Caption-Abstract -s3 ${image}`).toString()

/** The current date. */
const date = new Date(Date.now())
/**
 * The date from the image file.
 *
 * EXIF DateTime is in the format YYYY:MM:DD HH:MM:SS, so replace the first two
 * `:` with `-` so the Date constructor can parse it.
 */
const fileDate = new Date(
	execSync(`exiftool -DigitalCreationDateTime -s3 ${image}`)
		.toString()
		.replace(/:/, '-')
		.replace(/:/, '-')
)
const postedDate = values.old ? fileDate.toISOString() : date.toISOString()

/**
 * Write metadata to TOML file.
 *
 * If this is the first image in a gallery, remember to create the content
 * directory and markdown page first.
 */

/** Get the last two segments of the image path. */
const sourceDirectory = dir.split('/').slice(-2)
const isScreenShotGallery = sourceDirectory[0] === 'screen-shots'

const configPath = isScreenShotGallery
	? sourceDirectory.join('/')
	: sourceDirectory[1]
const toml = TOML.stringify({
	title: title.trim(),
	caption: caption.trim(),
	posted: postedDate,
})

await writeFile(`content/photos/${configPath}/${name}.toml`, toml)

/**
 * Update gallery timestamp.
 */

/** Path to image's gallery page. */
const galleryFile = new URL(
	`../content/photos/${configPath}.md`,
	import.meta.url
)
const galleryContent = await readFile(galleryFile, 'utf8')
const [coverImage] = galleryContent.match(/cover: [\w-]*/)

await writeFile(
	galleryFile,
	galleryContent.replace(/updated: [\w.:-]*/, `updated: ${postedDate}`)
)

const screenShotFile = new URL(
	'../content/photos/screen-shots.md',
	import.meta.url
)

if (isScreenShotGallery) {
	let screenShotContent = await readFile(screenShotFile, 'utf8')

	screenShotContent = screenShotContent
		.replace(/cover: [\w-]*/, coverImage)
		.replace(/updated: [\w.:-]*/, `updated: ${postedDate}`)

	await writeFile(screenShotFile, screenShotContent)
}
