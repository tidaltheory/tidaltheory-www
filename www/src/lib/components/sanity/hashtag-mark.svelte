<script>
import { onMount } from 'svelte'

/**
 * @typedef {Object} Props
 * @property {import('@portabletext/svelte').MarkComponentProps} portableText
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { portableText, children } = $props()

/** @type {HTMLElement} */
let mark = $state()

/** @param {HTMLElement} mark */
function insertSpaces(mark) {
	mark.textContent = portableText.plainTextContent
		.replaceAll(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
		.replaceAll(/([\da-z])([A-Z])/g, '$1 $2')
}

onMount(() => {
	if (mark) insertSpaces(mark)
})
</script>

<mark
	bind:this={mark}
	class="text-grey-300 bg-grey-900 rounded-sm bg-opacity-0 before:opacity-50 before:content-['#\002009']"
>
	{@render children?.()}
</mark>
