import type { PortableTextBlock } from '@portabletext/types'
import { HighlightIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { serializePortableText } from '../utils/serialize-portable-text'
import { decorators } from './fields/inline'
import { ledeField } from './fields/lede'

interface PreviewArguments {
	lede: PortableTextBlock[]
	title: string
	image?: string
}

export default defineType({
	name: 'caseStudy',
	title: 'Case study',
	icon: HighlightIcon,
	type: 'document',
	preview: {
		select: {
			image: 'images[0].image',
			title: 'title',
			lede: 'lede',
		},
		prepare({ image, title, lede }: PreviewArguments) {
			return {
				media: image,
				title,
				subtitle: serializePortableText(lede),
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
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: (document, context) => [document.title].join('-'),
				maxLength: 96,
				isUnique: async (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'startDate',
			title: 'Start date',
			type: 'date',
		}),
		defineField({
			name: 'endDate',
			title: 'End date',
			type: 'date',
		}),
		defineField({
			name: 'discipline',
			title: 'Discipline',
			type: 'array',
			of: [defineArrayMember({ type: 'string' })],
			options: {
				layout: 'tags',
			},
		}),
		ledeField,
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				defineArrayMember({ type: 'block', marks: { decorators } }),
				defineArrayMember({
					type: 'image',
					icon: ImageIcon,
					options: {
						storeOriginalFilename: true,
						metadata: ['blurhash', 'lqip', 'palette', 'exif'],
						hotspot: true,
					},
					fields: [
						defineField({
							name: 'caption',
							title: 'Caption',
							type: 'string',
						}),
						defineField({
							name: 'alt',
							title: 'Alt description',
							type: 'text',
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
				defineArrayMember({ type: 'image-set' }),
				defineArrayMember({ type: 'code' }),
				defineArrayMember({ type: 'blockquote' }),
				defineArrayMember({ type: 'aside' }),
			],
		}),
	],
})
