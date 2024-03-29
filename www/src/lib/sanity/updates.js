import groq from 'groq'

import { client } from './client.js'

/**
 * @typedef {object} ImageObject
 * @prop {import('@sanity/types').Asset} image
 * @prop {import('@sanity/types').AssetMetadataType} metadata
 */

/**
 * @typedef {object} Update
 * @prop {import('../../../../studio/sanity.config.js').SanityValues['update']['type']} type
 * @prop {string} id
 * @prop {string} date
 * @prop {number} [count]
 * @prop {string} slug
 * @prop {string} [title]
 * @prop {string | import('@portabletext/types').PortableTextBlock} [excerpt]
 * @prop {import('@sanity/types').Asset} [coverImage]
 * @prop {ImageObject[]} [images]
 */

/**
 * @returns {Promise<Update[]>}
 */
export async function getUpdates() {
	return await client.fetch(
		groq`*[_type == "update"]{
			type,
			'id': _id,
			'date': select(
				type == 'gallery-update' => _createdAt,
				reference->_createdAt,
			),
			count,
			'slug': select(
				reference->category == 'screen-shots' =>
					array::join(['screen-shots', reference->slug.current], '/'),
				reference->slug.current
			),
			'title': select(
				reference->subtitle != null =>
					array::join([reference->title, reference->subtitle], ' '),
				reference->title
			),
			'excerpt': select(
				type == 'post-add' => pt::text(reference->lede),
				type == 'note-add' => reference->content,
			),
			'coverImage': select(type == 'post-add' => reference->cover->image.asset),
			'images': select(type == 'gallery-add' => reference->images[0...4]->{
				'image': image.asset,
				'metadata': image.asset->metadata,
			})
		} | order(date desc)[0...10]`,
	)
}
