<script>
import { onMount, onDestroy, tick } from 'svelte'

/** @type {string | undefined} */
export let gapClass = undefined
/** @type {any[]} */
export let items = []

/**
 * @typedef {Object} Grid
 * @property {HTMLDivElement} _el
 * @property {number} gap
 * @property {HTMLElement[]} items
 * @property {number} ncol
 * @property {number} mod
 */

/** @type {Grid} */
let grid
/** @type {HTMLDivElement} */
let masonryElement

export const refreshLayout = async () => {
	/* Get the post relayout number of columns */
	console.log('COLS', getComputedStyle(grid._el).gridTemplateColumns)
	let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length
	let gap = Number.parseFloat(getComputedStyle(grid._el).gap)

	for (const c of grid.items) {
		let newHeight = c.getBoundingClientRect().height

		if (newHeight !== Number(c.dataset.h)) {
			c.dataset.h = newHeight.toString()
			grid.mod++
		}
	}

	/* If the number of columns has changed or the gap width has changed. */
	if (grid.ncol !== ncol || grid.mod || grid.gap !== gap) {
		grid.ncol = ncol
		grid.gap = gap

		/* Revert to initial positioning, no margin */
		for (const c of grid.items) c.style.removeProperty('margin-top')

		/* If we have more than one column */
		if (grid.ncol > 1) {
			for (const [index, c] of grid.items.slice(ncol).entries()) {
				/* Bottom edge of item above */
				let previousFinal =
					grid.items[index].getBoundingClientRect().bottom
				/* Top edge of current item */
				let currentInitial = c.getBoundingClientRect().top

				c.style.marginTop = `${
					previousFinal + grid.gap - currentInitial
				}px`
			}
		}

		grid.mod = 0
	}
}

/** @param {HTMLDivElement} element */
const calcGrid = async (element) => {
	await tick()
	if (getComputedStyle(element).gridTemplateRows !== 'masonry') {
		grid = {
			_el: element,
			gap: Number.parseFloat(getComputedStyle(element).gap),
			// @ts-ignore
			items: [...element.childNodes].filter(
				(c) =>
					c.nodeType === 1 &&
					Number(getComputedStyle(c).gridColumnEnd) !== -1,
			),
			ncol: 0,
			mod: 0,
		}

		/* Initial load */
		refreshLayout()
	}
}

/** @type {Window} */
let _window

onMount(() => {
	_window = window
	_window.addEventListener('resize', refreshLayout, false)
})
onDestroy(() => {
	_window?.removeEventListener('resize', refreshLayout, false)
})

$: if (masonryElement) {
	calcGrid(masonryElement)
}

// Update if items are changed
$: if (items) {
	// Refresh masonryElement
	masonryElement = masonryElement
}
</script>

<div bind:this={masonryElement} class="masonry-grid grid {gapClass}">
	<slot />
</div>

<style>
.masonry-grid {
	grid: 1fr auto / repeat(2, 1fr);
	grid: masonry / repeat(2, 1fr);
	align-items: start;
}
</style>
