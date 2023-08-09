<script>
import { PortableText } from '@portabletext/svelte'

import HashtagMark from './sanity/hashtag-mark.svelte'

/** @typedef {import('@portabletext/types').ArbitraryTypedObject} ATO */
/** @typedef {import('@portabletext/types').PortableTextBlock} PTB */
/** @typedef {ATO | PTB | Array<ATO | PTB>} InputValue */

/** @type {InputValue} */
export let value

/** @type {any} */
const marks = {
	hashtag: HashtagMark,
}
</script>

<PortableText
	{value}
	components={{
		marks,
	}}
/>
