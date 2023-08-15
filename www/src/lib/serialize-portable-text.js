/** @param {import('@portabletext/types').PortableTextBlock[]} blocks */
export function serializePortableText(blocks = []) {
	return (
		blocks
			.map((block) => {
				// If it's not a text block with children, return nothing.
				if (block._type !== 'block' || !block.children) {
					return ''
				}

				// Loop through the children spans, and join the text strings.
				return block.children.map((child) => child.text).join('')
			})
			// Join the paragraphs leaving split by two linebreaks.
			.join('\n\n')
	)
}
