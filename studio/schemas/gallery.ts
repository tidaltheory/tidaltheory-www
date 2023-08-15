import { ImagesIcon } from '@sanity/icons'
import type { ReferenceValue } from 'sanity'

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
			image: 'cover.image',
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
			type: 'reference',
			to: [{ type: 'photo' as const }],
			options: {
				/**
				 * Choose from Photos which are referenced in the images field.
				 */
				filter({ document }) {
					let photos = (document.images as ReferenceValue[]).map((index) => index._ref)
					return {
						filter: '_type == "photo" && _id in $photos',
						params: { photos },
					}
				},
			},
			validation: (rule) => rule.required(),
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
			title: 'Category',
			name: 'category',
			type: 'string',
			options: {
				list: [
					{ title: 'Screen Shots', value: 'screen-shots' },
					{ title: 'Photo Series', value: 'photo-series' },
				],
				layout: 'radio',
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
