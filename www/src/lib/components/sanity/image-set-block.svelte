<script>
import PortableText from '../portable-text.svelte'

/** @type {import('@portabletext/svelte').CustomBlockComponentProps} */
export let portableText

$: ({ value } = portableText)
</script>

<div class="not-prose grid gap-x-8 lg:grid-cols-2">
	{#each value.images as image}
		<PortableText value={image} />
	{/each}
</div>
