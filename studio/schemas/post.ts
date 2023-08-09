import { defineArrayMember, defineField, defineType } from 'sanity'

import { ledeField } from './fields/lede'

export default defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
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
				source: 'title',
				maxLength: 96,
				isUnique: async (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		ledeField,
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					options: {
						metadata: [
							'blurhash', // Default: included
							'lqip', // Default: included
							'palette', // Default: included
							'exif',
						],
						hotspot: true,
					},
				},
				{ type: 'code' },
				{ type: 'blockquote' },
			],
		}),
	],
})
