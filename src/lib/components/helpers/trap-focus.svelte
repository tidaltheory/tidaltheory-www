<script>
import { onMount, onDestroy, tick } from 'svelte'

export let initialFocusElement = null

let reference
let tabbableChildren
let firstTabbableChild
let lastTabbableChild
let returnFocusElement

onMount(async () => {
	await tick()

	returnFocusElement = document.activeElement
	tabbableChildren = [...reference.querySelectorAll('*')].filter(
		(node) => node.tabIndex >= 0
	)
	firstTabbableChild = tabbableChildren[0]
	lastTabbableChild = tabbableChildren[tabbableChildren.length - 1]

	// Wait for children to mount before trying to focus `initialFocusElement`
	await tick()
	if (initialFocusElement) {
		initialFocusElement.focus()
	} else {
		const initialFocusElement_ =
			reference.querySelector('[autofocus]') ||
			// FirstTabbableChild ||
			reference.querySelector('[data-svelte-dialog-content]')

		initialFocusElement_.focus()
	}
})

onDestroy(() => {
	if (returnFocusElement) {
		returnFocusElement.focus()
	}
})

const handleKeydown = (event) => {
	if (event.key !== 'Tab') return

	if (tabbableChildren.length === 0) {
		event.preventDefault()
	}

	if (event.shiftKey) {
		// Handle shift + tab
		if (document.activeElement === firstTabbableChild) {
			event.preventDefault()
			lastTabbableChild.focus()
		}
	} else if (document.activeElement === lastTabbableChild) {
		event.preventDefault()
		firstTabbableChild.focus()
	}
}
</script>

<svelte:window on:keydown={handleKeydown} />

<div bind:this={reference}>
	<slot />
</div>
