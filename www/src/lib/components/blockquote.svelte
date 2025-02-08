<script>
/**
 * @typedef {Object} Props
 * @property {string} quote
 * @property {string} source
 */

/** @type {Props} */
let { quote, source } = $props()
</script>

<figure>
	<blockquote>{@html quote}</blockquote>
	{#if source}
		<figcaption>
			<small class="text-sm">{@html source}</small>
		</figcaption>
	{/if}
</figure>
