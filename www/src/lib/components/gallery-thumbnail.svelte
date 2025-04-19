<script>
import ObserveIntersection from 'svelte-intersection-observer'

import { FOCUS_OUTLINE } from '$lib/classnames.js'

/**
 * @typedef {Object} Props
 * @property {import('@tidaltheory/lens').ImageThumbnails} image
 * @property {boolean} isHidden
 * @property {boolean} [isDelayed]
 * @property {(e: MouseEvent) => void} onClick
 * @property {number} [index]
 */

/** @type {Props} */
let { image, isHidden, isDelayed = false, onClick, index } = $props()

let { aspectRatio } = $derived(image.metadata.dimensions)
let srcset = $derived(
	`${image.srcset.sm} 300w, ${image.srcset.md} 600w, ${image.srcset.lg} 1200w,`,
)
let intersectionRatio = $derived(index < 3 ? 0 : 0.45)

/** @type {HTMLDivElement} */
let thumb = $state()
</script>

<button
	class="flex w-full rounded-[1px] transition {FOCUS_OUTLINE}"
	type="button"
	class:opacity-50={isHidden}
	onclick={onClick}
	tabindex={index}
>
	<ObserveIntersection once element={thumb} threshold={intersectionRatio}>
		{#snippet children({ intersecting })}
			<div
				class="relative flex w-full transition duration-500"
				class:opacity-0={!intersecting}
				class:translate-y-6={!intersecting}
				class:delay-75={isDelayed}
				style:aspect-ratio={aspectRatio}
				style:background-color={image.metadata.palette.darkMuted.background}
				bind:this={thumb}
			>
				<!--
					Using aspect-ratio on the parent and absolute positioning
					on the image because of a weird issue in Safari where it
					continually procs the ResizeObserver in masonry-grid.
				 -->
				<img
					class="absolute w-full"
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
		{/snippet}
	</ObserveIntersection>
</button>
