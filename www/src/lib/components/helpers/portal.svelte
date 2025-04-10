<script>
import { onMount } from 'svelte'
/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { children } = $props()

let reference = $state()
let portal

onMount(() => {
	/**
	 * Create and append a DOM node to `document.body` and render the component
	 * into it.
	 */
	portal = document.createElement('div')
	portal.dataset.sveltePortal = 'true'
	document.body.append(portal)
	portal.append(reference)

	return () => {
		portal.remove()
	}
})
</script>

<div bind:this={reference}>
	{@render children?.()}
</div>
