import { defineField } from 'sanity'

import { inlineOnlyBlock } from './inline'

export const ledeField = defineField({
	name: 'lede',
	description: 'Used both for the <meta> description tag, and for introductory text.',
	title: 'Lede',
	type: 'array',
	of: [inlineOnlyBlock],
	validation: (rule) => rule.max(155).required(),
})
