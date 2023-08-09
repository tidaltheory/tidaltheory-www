import { defineArrayMember } from 'sanity'

import { Cite } from '../../components/cite'

export const inlineOnlyBlock = defineArrayMember({
	type: 'block',
	styles: [],
	lists: [],
	marks: {
		decorators: [
			{ title: 'Strong', value: 'strong' },
			{ title: 'Italic', value: 'em' },
			{ title: 'Code', value: 'code' },
			{
				title: 'Cite',
				value: 'cite',
				component: Cite,
			},
		],
	},
})
