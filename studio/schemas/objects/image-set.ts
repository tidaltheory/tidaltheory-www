import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { inlineImage } from '../fields/inline-image'

export const imageSet = defineType({
	name: 'image-set',
	title: 'Image Set',
	type: 'object',
	icon: ImagesIcon,
	fields: [
		defineField({
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [inlineImage],
			validation: (rule) => rule.min(2).max(4),
		}),
	],
})
