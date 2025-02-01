import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { json } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async () => {
	const readlist = JSON.parse(
		await readFile(path.resolve('content/read.json'), 'utf8'),
	)
	readlist.reverse()
	return json(readlist)
}
