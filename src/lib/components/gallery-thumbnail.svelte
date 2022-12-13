<script>
import ObserveIntersection from 'svelte-intersection-observer'

import { FOCUS_OUTLINE } from '$lib/classnames'

import ImageLens from './image-lens.svelte'

/** @type {import('@tidaltheory/lens').ImageThumbnails} */
export let image
export let isHidden
export let onClick

const ratio =
	image.thumbnails['gallery-sm'].dimensions.width /
	image.thumbnails['gallery-sm'].dimensions.height

/** @type {HTMLDivElement} */
let thumb
</script>

<button
	class="flex w-full rounded-[1px] transition {FOCUS_OUTLINE}"
	type="button"
	class:opacity-50={isHidden}
	style:aspect-ratio={ratio}
	on:click={onClick}
>
	<ObserveIntersection once element={thumb} threshold={0.45} let:intersecting>
		<div
			class="flex transition duration-500"
			class:opacity-0={!intersecting}
			class:translate-y-6={!intersecting}
			bind:this={thumb}
		>
			<ImageLens
				image={image.thumbnails}
				sizes={['gallery-sm', 'gallery-md', 'gallery-lg']}
			/>
		</div>
	</ObserveIntersection>
</button>
