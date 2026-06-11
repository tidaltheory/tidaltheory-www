/**
 * A workaround for SvelteKit issue with AT protocol URIs.
 * @see https://github.com/sveltejs/kit/issues/15935
 */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const output = path.join(process.cwd(), 'build')
const files = await readdir(output, { recursive: true })
const htmlFiles = files.filter((file) => path.extname(file) === '.html')

const update = async (fileRelativePath) => {
	const filePath = path.join(output, fileRelativePath)
	const content = await readFile(filePath, 'utf8')
	const cleanedContent = content
		.replaceAll(
			'site.standard.publication external',
			'site.standard.publication',
		)
		.replaceAll('site.standard.document external', 'site.standard.document')
	await writeFile(filePath, cleanedContent, 'utf8')
}

await Promise.all(htmlFiles.map((element) => update(element)))

// eslint-disable-next-line no-console
console.log('✅ Cleaned site.standard.* meta tags.')
