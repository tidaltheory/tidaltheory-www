import { ImagesIcon } from '@sanity/icons'

import type { PortableTextBlock } from '@portabletext/types'
import { defineArrayMember, defineField, defineType } from '@sanity-typed/types'

import { serializePortableText } from '../utils/serialize-portable-text'

import { ledeField } from './fields/lede'

export default defineType({
	name: 'gallery',
	title: 'Gallery',
	icon: ImagesIcon,
	type: 'document',
	preview: {
		select: {
			image: 'cover',
			title: 'title',
			subtitle: 'subtitle',
			lede: 'lede',
		},
		prepare({ image, title, subtitle, lede }) {
			return {
				media: image as string,
				title: [title, subtitle].join(' '),
				subtitle: serializePortableText(lede as PortableTextBlock[]),
			}
		},
	},
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: (document_, context) => [document_.title, document_.subtitle].join('-'),
				maxLength: 96,
				isUnique: async (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'cover',
			title: 'Cover',
			type: 'image',
			options: {
				storeOriginalFilename: true,
				hotspot: true,
				metadata: ['blurhash', 'lqip', 'palette', 'exif'],
			},
			//   Validation: (rule) => rule.required(),
		}),
		ledeField,
		defineField({
			name: 'platform',
			title: 'Platform',
			type: 'array',
			of: [defineArrayMember({ type: 'string' })],
			options: {
				layout: 'tags',
			},
		}),
		defineField({
			name: 'developer',
			title: 'Developer',
			type: 'string',
		}),
		defineField({
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'photo' } as const],
					weak: true,
					options: {},
				}),
			],
			options: {
				layout: 'grid',
			},
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [defineArrayMember({ type: 'block' })],
		}),
	],
})
