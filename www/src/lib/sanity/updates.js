import groq from 'groq'

import { client } from './client.js'

/**
 * @returns {Promise<import('./types.js').UpdateQueryResult>}
 */
export async function getUpdates() {
	let updateQuery = groq`
		*[_type == "update"]{
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
		} | order(date desc)[0...10]`

	return await client.fetch(updateQuery)
}
