import { codeInput } from '@sanity/code-input'
import { BlockquoteIcon, MasterDetailIcon, TiersIcon } from '@sanity/icons'
import { visionTool } from '@sanity/vision'
import {
	defineConfig,
	defineField,
	defineType,
	type DocumentActionComponent,
	type DocumentActionsContext,
	useDocumentOperation,
} from 'sanity'
import { structureTool } from 'sanity/structure'

import caseStudy from './schemas/case-study'
import { inlineOnlyBlock } from './schemas/fields/inline'
import gallery from './schemas/gallery'
import note from './schemas/note'
import { imageSet } from './schemas/objects/image-set'
import page from './schemas/page'
import photo from './schemas/photo'
import post from './schemas/post'
import project from './schemas/project'
import update from './schemas/update'

// Export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [home.name, page.name, project.name]

const config = defineConfig({
	name: 'default',
	title: 'Tidal Theory',

	projectId: 'iic1csde',
	dataset: 'production',

	plugins: [structureTool(), visionTool(), codeInput()],

	schema: {
		types: [
			caseStudy,
			gallery,
			note,
			page,
			photo,
			post,
			project,
			update,
			defineType({
				name: 'blockquote',
				title: 'Blockquote',
				type: 'object',
				icon: BlockquoteIcon,
				fields: [
					defineField({
						name: 'quote',
						title: 'Quote',
						type: 'array',
						of: [inlineOnlyBlock],
					}),
					defineField({
						name: 'source',
						title: 'Source',
						type: 'array',
						of: [inlineOnlyBlock],
					}),
				],
			}),
			defineType({
				name: 'aside',
				title: 'Aside',
				type: 'object',
				icon: MasterDetailIcon,
				fields: [
					defineField({
						name: 'content',
						title: 'Content',
						type: 'array',
						of: [inlineOnlyBlock],
					}),
				],
			}),
			defineType({
				name: 'codepen',
				title: 'CodePen',
				type: 'object',
				icon: TiersIcon,
				fields: [
					defineField({
						name: 'url',
						title: 'CodePen URL',
						type: 'url',
					}),
					defineField({
						name: 'caption',
						title: 'Caption',
						type: 'array',
						of: [inlineOnlyBlock],
					}),
				],
			}),
			imageSet,
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
