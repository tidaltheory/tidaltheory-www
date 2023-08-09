import { DocumentTextIcon, TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { Hashtag } from '../components/hashtag'

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
					return Date.parse(document_._createdAt).toString()
				},
				isUnique: async (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				{
					type: 'block',
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Code', value: 'code' },
							{
								title: 'Hashtag',
								value: 'hashtag',
								icon: TagIcon,
								component: Hashtag,
							},
						],
					},
				},
			],
		}),
	],
})
