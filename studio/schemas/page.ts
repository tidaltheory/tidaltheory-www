import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { decorators } from './fields/inline'
import { ledeField } from './fields/lede'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	icon: DocumentIcon,
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
				isUnique: async (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		ledeField,
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [{ type: 'block', marks: { decorators } }],
		}),
	],
})
