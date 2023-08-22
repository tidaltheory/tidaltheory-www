<script>
/** @type {string} */
export let quote
/** @type {string} */
export let source
</script>

<figure>
	<blockquote>{@html quote}</blockquote>
	{#if source}
		<figcaption>
			<small class="text-sm">{@html source}</small>
		</figcaption>
	{/if}
</figure>
