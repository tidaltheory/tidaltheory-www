import { DocumentIcon, DocumentTextIcon, ImageIcon, TagsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'note',
	title: 'Note',
	icon: DocumentTextIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source(document_, context) {
					console.log({ doc: document_, context })
					return ''
				},
				// Source: '_createdAt',
				isUnique: async (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
})
