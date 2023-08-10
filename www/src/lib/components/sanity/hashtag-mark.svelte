<script>
import { onMount } from 'svelte'
/** @type {import('@portabletext/svelte').MarkComponentProps} */
export let portableText

/** @type {HTMLElement} */
let mark

/** @param {HTMLElement} mark */
function insertSpaces(mark) {
	mark.textContent = portableText.plainTextContent
		.replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
		.replace(/([\da-z])([A-Z])/g, '$1 $2')
}

onMount(() => {
	if (mark) insertSpaces(mark)
})
</script>

<mark
	bind:this={mark}
	class="p-1 text-white rounded-sm before:opacity-50 before:content-['#\002009']"
>
	<slot />
</mark>
