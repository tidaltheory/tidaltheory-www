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

<figure>
	<blockquote><PortableText value={value.quote} /></blockquote>
	{#if value.source}
		<figcaption>
			<small class="text-sm"><PortableText value={value.source} /></small>
		</figcaption>
	{/if}
</figure>
