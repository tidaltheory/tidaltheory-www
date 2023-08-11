import { codeInput } from '@sanity/code-input'
import { BlockquoteIcon } from '@sanity/icons'
import { visionTool } from '@sanity/vision'
import type { DocumentActionComponent, DocumentActionsContext } from 'sanity'
import { useDocumentOperation } from 'sanity'
import { deskTool } from 'sanity/desk'

import { defineConfig, defineType } from '@sanity-typed/types'
import type { InferSchemaValues } from '@sanity-typed/types'

import { inlineOnlyBlock } from './schemas/fields/inline'
import gallery from './schemas/gallery'
import note from './schemas/note'
import page from './schemas/page'
import photo from './schemas/photo'
import post from './schemas/post'

// Export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [home.name, page.name, project.name]
export type SanityValues = InferSchemaValues<typeof config>

const config = defineConfig({
	name: 'default',
	title: 'Tidal Theory',

	projectId: 'iic1csde',
	dataset: 'production',

	plugins: [deskTool(), visionTool(), codeInput()],

	schema: {
		types: [
			gallery,
			note,
			page,
			photo,
			post,
			defineType({
				name: 'blockquote',
				title: 'Blockquote',
				type: 'object',
				icon: BlockquoteIcon,
				fields: [
					{
						name: 'quote',
						title: 'Quote',
						type: 'array',
						of: [inlineOnlyBlock],
					},
					{
						name: 'source',
						title: 'Source',
						type: 'array',
						of: [inlineOnlyBlock],
					},
				],
			}),
			defineType({
				name: 'aside',
				title: 'Aside',
				type: 'object',
				// Icon: BlockquoteIcon,
				fields: [
					{
						name: 'content',
						title: 'Content',
						type: 'array',
						of: [inlineOnlyBlock],
					},
				],
			}),
		],
	},

	document: {
		/**
		 * @todo Do a thing here to update Note slugs to Unix timestamp of `createdAt`.
		 */
		actions(previous, context) {
			return previous.map((original) =>
				original.action === 'publish' ? createPublishAction(original, context) : original,
			)
		},
	},
})

export default config

function createPublishAction(original: DocumentActionComponent, context: DocumentActionsContext) {
	let client = context.getClient({ apiVersion: '2023-03-20' })
	let publishAction: DocumentActionComponent = (properties) => {
		// eslint-disable-next-line etc/no-internal
		let { patch, publish } = useDocumentOperation(properties.id, properties.type)
		let originalResult = original(properties)

		return {
			...originalResult,
			label: originalResult?.label ?? '',
			async onHandle() {
				if (properties.type === 'note' && properties.draft) {
					patch.execute([
						{
							set: {
								// eslint-disable-next-line @typescript-eslint/naming-convention
								'slug.current': Date.parse(properties.draft._createdAt).toString(),
							},
						},
					])
				}

				originalResult?.onHandle?.()
			},
		}
	}

	return publishAction
}
