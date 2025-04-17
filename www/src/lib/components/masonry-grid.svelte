<script>
import { onDestroy, onMount, tick } from 'svelte'

import { debounce } from '$lib/debounce'

/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet<[any]>} children
 * @property {any[]} items
 */

/** @type {Props} */
const { children, items = [] } = $props()

/** @type {HTMLElement} */
let grid = $state()
/** @type {number[][]} */
let columns = $state([[], []])

let currentRedrawId = $state(0)

async function fillColumns(itemIndex, assignedRedrawId) {
	if (itemIndex >= items.length) return

	await tick()

	// Skip if a new redraw has been requested in parallel.
	if (currentRedrawId !== assignedRedrawId) return

	/** @type {HTMLDivElement[]} */
	const columnDivs = [...grid.children].map(
		(element) => /** @type {HTMLDivElement} */ (element),
	)

	// Find the shortest column.
	let shortestColumnIndex = 0
	let shortestHeight = columnDivs[0].getBoundingClientRect().height

	for (let index = 1; index < columnDivs.length; index++) {
		const { height } = columnDivs[index].getBoundingClientRect()
		if (height < shortestHeight) {
			shortestHeight = height
			shortestColumnIndex = index
		}
	}

	// Add the item to the shortest column.
	columns[shortestColumnIndex] = [...columns[shortestColumnIndex], itemIndex]
	await fillColumns(itemIndex + 1, assignedRedrawId)
}

async function redraw() {
	if (!grid) return

	// Reset columns before redrawing.
	columns = [[], []]
	await fillColumns(0, ++currentRedrawId)
}

const debouncedUpdate = debounce(redraw, 100)
const resizeObserver =
	typeof ResizeObserver === 'undefined'
		? undefined
		: new ResizeObserver(debouncedUpdate)

onMount(() => {
	redraw()
	resizeObserver?.observe(grid)
})

onDestroy(() => {
	if (resizeObserver) {
		resizeObserver.unobserve(grid)
	}
})
</script>

<div class="flex gap-4 md:gap-8 xl:gap-16" bind:this={grid}>
	{#each columns as column, index (column)}
		<div
			class="flex h-max grow flex-col gap-4 md:gap-8 xl:gap-16"
			data-index={index}
		>
			{#each column as itemIndex (itemIndex)}
				<div class="masonry-item" data-index={itemIndex}>
					{@render children({ item: items[itemIndex], index: itemIndex })}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
.masonry-item {
	width: 100%;
}
</style>
