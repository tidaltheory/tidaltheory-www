<script>
import { PortableText } from '@portabletext/svelte'

import AsideBlock from './sanity/aside-block.svelte'
import BlockquoteBlock from './sanity/blockquote-block.svelte'
import CiteMark from './sanity/cite-mark.svelte'
import CodeBlock from './sanity/code-block.svelte'
import CodePenBlock from './sanity/codepen-block.svelte'
import HashtagMark from './sanity/hashtag-mark.svelte'
import ImageBlock from './sanity/image-block.svelte'
import ImageSetBlock from './sanity/image-set-block.svelte'

let { value } = $props()

/** @type {any} */
const components = {
	types: {
		aside: AsideBlock,
		blockquote: BlockquoteBlock,
		code: CodeBlock,
		image: ImageBlock,
		'image-set': ImageSetBlock,
		codepen: CodePenBlock,
	},
	marks: {
		cite: CiteMark,
		hashtag: HashtagMark,
	},
}
</script>

<PortableText {value} {components} />
