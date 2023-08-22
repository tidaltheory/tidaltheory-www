<script>
import { PortableText } from '@portabletext/svelte'

import AsideBlock from './sanity/aside-block.svelte'
import BlockquoteBlock from './sanity/blockquote-block.svelte'
import CiteMark from './sanity/cite-mark.svelte'
import CodeBlock from './sanity/code-block.svelte'
import HashtagMark from './sanity/hashtag-mark.svelte'
import ImageBlock from './sanity/image-block.svelte'

export let value

/** @type {any} */
const components = {
	types: {
		aside: AsideBlock,
		blockquote: BlockquoteBlock,
		code: CodeBlock,
		image: ImageBlock,
	},
	marks: {
		cite: CiteMark,
		hashtag: HashtagMark,
	},
}
</script>

<PortableText {value} {components} />
