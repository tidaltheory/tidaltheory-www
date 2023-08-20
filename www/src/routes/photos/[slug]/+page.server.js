import { error } from '@sveltejs/kit'

import { getGallery } from '$lib/sanity/galleries.js'
import { urlFor } from '$lib/sanity/image.js'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const post = await getGallery(params.slug)

	if (post) {
		/** @todo Get optimal OG image height and include .height() */
		post.coverImage = urlFor(post.coverImage)
			.width(1200)
			.format('jpg')
			.url()

		post.images = post.images.map((image) => {
			let imageObject = image.image
			let metaObject = image.metadata

			image = {
				...imageObject,
				metadata: metaObject,
			}
			image.srcset = {
				sm: urlFor(image.asset).width(300).format('webp').url(),
				md: urlFor(image.asset).width(600).format('webp').url(),
				lg: urlFor(image.asset).width(1200).format('webp').url(),
				xl: urlFor(image.asset).width(2400).format('webp').url(),
			}

			return image
		})

		return { post }
	}

	throw error(404, 'Not found.')
}
