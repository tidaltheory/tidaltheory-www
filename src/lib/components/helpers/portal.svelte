<script>
import { onMount } from 'svelte'

let reference
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
	<slot />
</div>
