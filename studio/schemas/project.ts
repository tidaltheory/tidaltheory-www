import { ImageIcon, ImagesIcon, ProjectsIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import type { PortableTextBlock } from '@portabletext/types'

import { serializePortableText } from '../utils/serialize-portable-text'
import { ledeField } from './fields/lede'

interface PreviewArguments {
	lede: PortableTextBlock[]
	title: string
	image?: string
}

export default defineType({
	name: 'project',
	title: 'Project',
	icon: ProjectsIcon,
	type: 'document',
	preview: {
		select: {
			image: 'images[0].image',
			title: 'title',
			lede: 'lede',
		},
		prepare({ image, title, lede }: PreviewArguments) {
			return {
				media: image,
				title,
				subtitle: serializePortableText(lede),
			}
		},
	},
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		ledeField,
		defineField({
			name: 'repo',
			title: 'Repository',
			type: 'url',
		}),
		defineField({
			name: 'site',
			title: 'Website',
			type: 'url',
		}),
		defineField({
			name: 'post',
			title: 'Blog post',
			type: 'url',
		}),
		defineField({
			icon: ImagesIcon,
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'image',
					title: 'Image',
					icon: ImageIcon,
					type: 'image',
					options: {
						storeOriginalFilename: true,
						hotspot: true,
						metadata: ['blurhash', 'lqip', 'palette', 'exif'],
					},
				}),
			],
			options: {
				layout: 'grid',
			},
		}),
	],
})
