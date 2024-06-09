import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'update',
	title: 'Update',
	icon: DocumentTextIcon,
	type: 'document',
	fields: [
		defineField({
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: ['gallery-add', 'post-add', 'gallery-update', 'note-add'],
			},
		}),
		defineField({
			title: 'Images added',
			name: 'count',
			type: 'number',
			hidden: ({ parent, value }) => parent.type !== 'gallery-update',
		}),
		defineField({
			title: 'Reference page',
			name: 'reference',
			type: 'reference',
			to: [
				{ type: 'gallery' } as const,
				{ type: 'note' } as const,
				{ type: 'post' } as const,
			],
			options: {
				filter({ document }) {
					return {
						filter: '_type == $type',
						params: { type: (document.type as string).split('-')[0] },
					}
				},
				disableNew: true,
			},
		}),
	],
})
