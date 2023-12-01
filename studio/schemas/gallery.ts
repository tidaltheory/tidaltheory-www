import { ImagesIcon } from '@sanity/icons'
import type { ReferenceValue } from 'sanity'

import type { PortableTextBlock } from '@portabletext/types'
import { defineArrayMember, defineField, defineType } from '@sanity-typed/types'

import { serializePortableText } from '../utils/serialize-portable-text'

import { inlineOnlyBlock } from './fields/inline'
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
		prepare({
			image,
			title,
			subtitle,
			lede,
		}: {
			image: string
			title: string
			subtitle?: string
			lede: PortableTextBlock[]
		}) {
			return {
				media: image,
				title: [title, subtitle].join(' '),
				subtitle: serializePortableText(lede),
			}
		},
	},
	fieldsets: [
		{
			name: 'intro',
			title: 'Intro',
			options: { columns: 2 },
		},
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
			fieldset: 'intro',
		}),
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			fieldset: 'intro',
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
			fieldset: 'intro',
		}),
		defineField({
			name: 'cover',
			title: 'Cover',
			type: 'reference',
			to: [{ type: 'photo' as const }],
			options: {
				disableNew: true,
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
			fieldset: 'intro',
		}),
		ledeField,
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
			name: 'platform',
			title: 'Platform',
			type: 'array',
			of: [defineArrayMember({ type: 'string' })],
			options: {
				layout: 'tags',
			},
			hidden: ({ parent }) => parent.category !== 'screen-shots',
		}),
		defineField({
			name: 'developer',
			title: 'Developer',
			type: 'string',
			hidden: ({ parent }) => parent.category !== 'screen-shots',
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
					options: {
						disableNew: true,
						filter({ document }) {
							let photos = (document.images as ReferenceValue[]).map(
								(index) => index._ref,
							)
							return {
								filter: '_type == "photo" && !(_id in $photos)',
								params: { photos },
							}
						},
					},
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
			of: [inlineOnlyBlock],
		}),
	],
})
