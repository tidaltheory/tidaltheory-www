import { TimelineIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { decorators } from '../fields/inline'

export const workExperience = defineType({
	name: 'work-experience',
	title: 'Work experience',
	type: 'object',
	icon: TimelineIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'company',
			title: 'Company',
			type: 'string',
		}),
		defineField({
			name: 'start',
			title: 'Start',
			type: 'string',
		}),
		defineField({
			name: 'end',
			title: 'End',
			type: 'string',
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
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [defineArrayMember({ type: 'block', marks: { decorators } })],
		}),
	],
})
