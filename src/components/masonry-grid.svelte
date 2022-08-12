<script>
import { onMount, onDestroy, tick } from 'svelte'

export let gapClass
export let items = [] // pass in data if it's dynamically updated

let grids = []
let masonryElement

export const refreshLayout = async () => {
	grids.forEach(async (grid) => {
		/* get the post relayout number of columns */
		let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(
			' '
		).length

		grid.items.forEach((c) => {
			let new_h = c.getBoundingClientRect().height

			if (new_h !== +c.dataset.h) {
				c.dataset.h = new_h
				grid.mod++
			}
		})

		/* if the number of columns has changed */
		if (grid.ncol !== ncol || grid.mod) {
			/* update number of columns */
			grid.ncol = ncol
			/* revert to initial positioning, no margin */
			grid.items.forEach((c) => c.style.removeProperty('margin-top'))
			/* if we have more than one column */
			if (grid.ncol > 1) {
				grid.items.slice(ncol).forEach((c, i) => {
					let prev_fin =
							grid.items[i].getBoundingClientRect()
								.bottom /* bottom edge of item above */,
						curr_ini =
							c.getBoundingClientRect()
								.top /* top edge of current item */

					c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`
				})
			}

			grid.mod = 0
		}
	})
}

const calcGrid = async (_masonryArr) => {
	await tick()
	if (
		_masonryArr.length &&
		getComputedStyle(_masonryArr[0]).gridTemplateRows !== 'masonry'
	) {
		grids = _masonryArr.map((grid) => {
			return {
				_el: grid,
				gap: parseFloat(getComputedStyle(grid).gridRowGap),
				items: [...grid.childNodes].filter(
					(c) =>
						c.nodeType === 1 &&
						+getComputedStyle(c).gridColumnEnd !== -1
				),
				ncol: 0,
				mod: 0,
			}
		})
		refreshLayout() /* initial load */
	}
}

let _window
onMount(() => {
	_window = window
	_window.addEventListener('resize', refreshLayout, false) /* on resize */
})
onDestroy(() => {
	if (_window) {
		_window.removeEventListener(
			'resize',
			refreshLayout,
			false
		) /* on resize */
	}
})

$: if (masonryElement) {
	calcGrid([masonryElement])
}

$: if (items) {
	// update if items are changed
	masonryElement = masonryElement // refresh masonryElement
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
</style>
