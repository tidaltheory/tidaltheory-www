import { defineArrayMember, defineField } from 'sanity'

export const ledeField = defineField({
	name: 'lede',
	description: 'Used both for the <meta> description tag, and for introductory text.',
	title: 'Lede',
	type: 'array',
	of: [
		defineArrayMember({
			lists: [],
			marks: {
				annotations: [],
				decorators: [
					{
						title: 'Italic',
						value: 'em',
					},
					{
						title: 'Strong',
						value: 'strong',
					},
					{
						title: 'Cite',
						value: 'cite',
					},
				],
			},
			styles: [],
			type: 'block',
		}),
	],
	validation: (rule) => rule.max(155).required(),
})
