import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'

export const inlineImage = defineArrayMember({
	type: 'image',
	icon: ImageIcon,
	options: {
		storeOriginalFilename: true,
		metadata: ['blurhash', 'lqip', 'palette', 'exif'],
		hotspot: true,
	},
	fields: [
		defineField({
			name: 'caption',
			title: 'Caption',
			type: 'string',
		}),
		defineField({
			name: 'alt',
			title: 'Alt description',
			type: 'text',
			validation: (Rule) => Rule.required(),
		}),
	],
})
