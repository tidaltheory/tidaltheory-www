import imageUrlBuilder from '@sanity/image-url'

import { client } from './client.js'

const builder = imageUrlBuilder(client)

/**
 * @param {import('@sanity/types').Image} source
 */
export function urlFor(source) {
	return builder.image(source)
}

/**
 *
 * @param {any} image
 * @param {number} width
 * @param {number} height
 * @param {'jpg' | 'webp'} format
 * @returns {string}
 */
export function getImageUrl(image, width, height, format = 'webp') {
	return urlFor(image).width(width).height(height).format(format).url()
}
