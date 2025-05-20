import { DocumentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { decorators } from './fields/inline'
import { ledeField } from './fields/lede'
import { workExperience } from './objects/work-experience'

export default defineType({
	name: 'resume',
	title: 'Resume',
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
				source: (document, context) => [document.title].join('-'),
				maxLength: 96,
				isUnique: async (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		ledeField,
		defineField({
			name: 'previousRoles',
			title: 'Previous roles',
			type: 'array',
			of: [defineArrayMember(workExperience)],
		}),
	],
})
