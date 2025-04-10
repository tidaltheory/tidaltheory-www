<script>
import PortableText from '../portable-text.svelte'

/**
 * @typedef {Object} Props
 * @property {import('@portabletext/svelte').CustomBlockComponentProps} portableText
 */

/** @type {Props} */
let { portableText } = $props()

let { value } = $derived(portableText)
</script>

<aside class="">
	<div class="prose-sm text-grey-400">
		<PortableText value={value.content} />
	</div>
</aside>
