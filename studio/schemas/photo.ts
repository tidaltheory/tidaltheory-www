import { ImageIcon, TagsIcon } from '@sanity/icons'
import { defineField, defineType, type Reference } from 'sanity'

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
				subtitle: image.asset.originalFilename as string,
			}
		},
	},
	fields: [
		// DefineField({
		//   name: 'title',
		//   title: 'Title',
		//   type: 'string',
		//   readOnly: true,
		//   initialValue: 'image.asset.originalFilename',
		// }),
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
					of: [{ type: 'string' }],
					options: {
						layout: 'tags',
					},
				}),
			],
		}),
	],
})
