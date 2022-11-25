<script>
import { onMount, onDestroy, tick } from 'svelte'

export let gapClass
export let items = []

/**
 * @typedef {Object} Grid
 * @property {HTMLDivElement} _el
 * @property {number} gap
 * @property {ChildNode[]} items
 * @property {number} ncol
 * @property {number} mod
 */

/** @type {Grid[]} */
let grids = []
/** @type {HTMLDivElement} */
let masonryElement

export const refreshLayout = async () => {
	for (const grid of grids) {
		/* Get the post relayout number of columns */
		let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(
			' '
		).length
		let gap = Number.parseFloat(getComputedStyle(grid._el).gap)

		for (const c of grid.items) {
			let newHeight = c.getBoundingClientRect().height

			if (newHeight !== Number(c.dataset.h)) {
				c.dataset.h = newHeight
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
}

/** @param {HTMLDivElement[]} _masonryArray */
const calcGrid = async (_masonryArray) => {
	await tick()
	if (
		_masonryArray.length > 0 &&
		getComputedStyle(_masonryArray[0]).gridTemplateRows !== 'masonry'
	) {
		grids = _masonryArray.map((grid) => ({
			_el: grid,
			gap: Number.parseFloat(getComputedStyle(grid).gap),
			items: [...grid.childNodes].filter(
				(c) =>
					c.nodeType === 1 &&
					Number(getComputedStyle(c).gridColumnEnd) !== -1
			),
			ncol: 0,
			mod: 0,
		}))
		refreshLayout() /* Initial load */
	}
}

let _window
onMount(() => {
	_window = window
	_window.addEventListener('resize', refreshLayout, false)
})
onDestroy(() => {
	_window?.removeEventListener('resize', refreshLayout, false)
})

$: if (masonryElement) {
	calcGrid([masonryElement])
}

// Update if items are changed
$: if (items) {
	// Refresh masonryElement
	// eslint-disable-next-line no-self-assign
	masonryElement = masonryElement
}
</script>

<div
	bind:this={masonryElement}
	class="masonry-grid grid place-items-center {gapClass}"
>
	<slot />
</div>

<style>
.masonry-grid {
	grid: 1fr auto / repeat(2, 1fr);
	grid: masonry / repeat(2, 1fr);
}
.masonry-grid > :global(*) {
	align-self: start;
}
</style>
