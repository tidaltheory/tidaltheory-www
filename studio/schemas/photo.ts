import { ImageIcon, TagsIcon } from '@sanity/icons'

import { defineArrayMember, defineField, defineType } from '@sanity-typed/types'

export default defineType({
	name: 'photo',
	title: 'Photo',
	icon: ImageIcon,
	type: 'document',
	preview: {
		select: {
			image: 'image',
		},
		prepare({ image }) {
			return {
				media: image as string,
				title: image.title as string,
				subtitle: image.caption as string,
			}
		},
	},
	fields: [
		defineField({
			name: 'image',
			title: 'Image',
			icon: ImageIcon,
			type: 'image',
			validation: (rule) => rule.required(),
			options: {
				storeOriginalFilename: true,
				hotspot: true,
				metadata: ['blurhash', 'lqip', 'palette', 'exif'],
			},
			fields: [
				defineField({
					name: 'title',
					title: 'Title',
					type: 'string',
				}),
				defineField({
					name: 'caption',
					title: 'Caption',
					type: 'text',
				}),
				defineField({
					name: 'alt',
					title: 'Alt description',
					type: 'text',
				}),
				defineField({
					name: 'tags',
					title: 'Tags',
					icon: TagsIcon,
					type: 'array',
					of: [defineArrayMember({ type: 'string' })],
					options: {
						layout: 'tags',
					},
				}),
			],
		}),
	],
})
