import { defineArrayMember, defineField, defineType } from 'sanity'

import { removeStopwords } from '../utils/remove-stopwords'
import { decorators } from './fields/inline'
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
				maxLength: 96,
				source: ({ title }) => removeStopwords(title as string),
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
				defineArrayMember({ type: 'block', marks: { decorators } }),
				defineArrayMember({
					type: 'image',
					options: {
						storeOriginalFilename: true,
						metadata: ['blurhash', 'lqip', 'palette', 'exif'],
						hotspot: true,
					},
				}),
				defineArrayMember({ type: 'code' }),
				defineArrayMember({ type: 'blockquote' }),
				defineArrayMember({ type: 'aside' }),
			],
		}),
	],
})
