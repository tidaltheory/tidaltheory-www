<script>
import { onDestroy, onMount } from 'svelte'
import { createClassComponent } from 'svelte/legacy'

import { MasonryGrid } from '@egjs/svelte-grid'

/**
 * @typedef {Object} Props
 * @property {number} [column]
 * @property {string} [align]
 * @property {number} [gap]
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { column = 2, align = 'stretch', gap = 16, children } = $props()

let container
let gridInstance

onMount(() => {
	// Create a class component wrapper for MasonryGrid.
	const GridComponent = createClassComponent({
		component: MasonryGrid,
		target: container,
		props: {
			column,
			align,
			gap,
		},
	})

	// Store the instance for cleanup
	gridInstance = GridComponent
})

onDestroy(() => {
	// Clean up the grid instance if it exists
	if (gridInstance && gridInstance.destroy) {
		gridInstance.destroy()
	}
})
</script>

<div bind:this={container}>
	{@render children?.()}
</div>
