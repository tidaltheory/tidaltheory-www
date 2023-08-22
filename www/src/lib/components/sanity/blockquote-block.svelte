<script>
import PortableText from '../portable-text.svelte'

/** @type {import('@portabletext/svelte').CustomBlockComponentProps} */
export let portableText

$: ({ value } = portableText)
</script>

<figure>
	<blockquote><PortableText value={value.quote} /></blockquote>
	{#if value.source}
		<figcaption>
			<small class="text-sm"><PortableText value={value.source} /></small>
		</figcaption>
	{/if}
</figure>
