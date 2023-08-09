import imageUrlBuilder from '@sanity/image-url'

import { client } from './sanity.js'

const builder = imageUrlBuilder(client)

/**
 * @param {import('@sanity/types').Image} source
 */
export function urlFor(source) {
	return builder.image(source)
}
