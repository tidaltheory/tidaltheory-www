<script>
import ObserveIntersection from 'svelte-intersection-observer'

import { FOCUS_OUTLINE } from '$lib/classnames.js'

// /** @type {import('@tidaltheory/lens').ImageThumbnails} */
export let image
/** @type {boolean} */
export let isHidden
/** @type {boolean} */
export let isDelayed = false
/** @type {(e: MouseEvent) => void} */
export let onClick

$: ({ aspectRatio } = image.metadata.dimensions)
$: srcset = `${image.srcset.sm} 300w, ${image.srcset.md} 600w, ${image.srcset.lg} 1200w,`

/** @type {HTMLDivElement} */
let thumb
</script>

<button
	class="flex w-full rounded-[1px] transition {FOCUS_OUTLINE}"
	type="button"
	class:opacity-50={isHidden}
	style:aspect-ratio={aspectRatio}
	on:click={onClick}
>
	<ObserveIntersection once element={thumb} threshold={0.45} let:intersecting>
		<div
			class="relative flex w-full transition duration-500"
			class:opacity-0={!intersecting}
			class:translate-y-6={!intersecting}
			class:delay-75={isDelayed}
			bind:this={thumb}
		>
			<img
				loading="lazy"
				decoding="async"
				{srcset}
				sizes="(min-width: 1024px) 34vw, (min-width: 768px) 32vw, 40vw"
				src={image.srcset.sm}
				alt=""
			/>
			<!-- <img
				class="absolute inset-0 w-full"
				src={image.metadata.lqip}
				alt=""
			/> -->
		</div>
	</ObserveIntersection>
</button>
