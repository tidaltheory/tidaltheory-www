<script>
export let quote
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
