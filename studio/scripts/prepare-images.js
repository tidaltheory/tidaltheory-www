import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { globby } from 'globby'
import { nanoid } from 'nanoid'
import sharp from 'sharp'
import { IptcParser } from 'ts-node-iptc'

const IMPORT_DIR = path.resolve('imports')
const SOURCE_IMAGES = await globby(path.posix.join(IMPORT_DIR, '*.jpg'))

let entries = []

for await (let source of SOURCE_IMAGES) {
	let sharpImage = sharp(source)
	let { iptc } = await sharpImage.metadata()
	let iptcData = iptc ? IptcParser.readIPTCData(iptc) : undefined
	let metadata = {
		title: iptcData?.object_name,
		caption: iptcData?.caption,
	}

	let { dir, name, ext } = path.parse(source)
	let filename = path.join(IMPORT_DIR, 'assets', `${name}${ext}`)
	let tag = name.split('_')[0]

	if (!existsSync(`${dir}/assets`)) await mkdir(`${dir}/assets`)

	await sharpImage
		.withMetadata()
		.jpeg({ quality: 90, mozjpeg: true })
		.toFile(filename)

	let url = `file://${filename}`
	let entryData = {
		_id: `drafts.i${nanoid(10)}`,
		_type: 'photo',
		image: {
			_type: 'image',
			_sanityAsset: `image@${url}`,
			...metadata,
			tags: [tag],
		},
	}

	entries.push(entryData)
}

if (entries.length > 0) {
	const dataset = entries.map((entry) => JSON.stringify(entry)).join('\n')
	const datasetFilePath = path.join(IMPORT_DIR, 'dataset.ndjson')
	await writeFile(datasetFilePath, dataset)
}
