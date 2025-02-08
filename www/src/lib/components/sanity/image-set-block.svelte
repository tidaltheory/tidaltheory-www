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

<div class="not-prose grid gap-x-8 lg:grid-cols-2">
	{#each value.images as image}
		<PortableText value={image} />
	{/each}
</div>
