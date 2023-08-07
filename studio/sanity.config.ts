import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import gallery from './schemas/gallery'
import note from './schemas/note'
import photo from './schemas/photo'
import post from './schemas/post'

// Export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [home.name, page.name, project.name]

export default defineConfig({
	name: 'default',
	title: 'Tidal Theory',

	projectId: 'iic1csde',
	dataset: 'production',

	plugins: [deskTool(), visionTool(), codeInput()],

	schema: {
		types: [gallery, note, photo, post],
	},

	document: {
		actions(previous) {
			/**
			 * @todo Do a thing here to update Note slugs to Unix timestamp of `createdAt`.
			 */
			// console.log('PREV', prev)
			return previous.map(
				(original) =>
					// Console.log('ORIGINAL', original)
					original,
			)
		},
	},
})
