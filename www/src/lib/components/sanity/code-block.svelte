<script>
/**
 * @typedef {Object} Props
 * @property {import('@portabletext/svelte').CustomBlockComponentProps} portableText
 */

/** @type {Props} */
let { portableText } = $props()

let { value } = $derived(portableText)
</script>

<figure class="m-0 my-[2em]">
	<pre class="p-4"><code class="language-{value.language}"
			>{@html value.code}</code
		></pre>
</figure>
