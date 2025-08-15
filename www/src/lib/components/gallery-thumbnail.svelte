<script>
import ObserveIntersection from 'svelte-intersection-observer'

import { FOCUS_OUTLINE } from '$lib/classnames.js'

/**
 * @typedef {import('../sanity/types').Photo} Image
 * @typedef {Image & Object} ModifiedImage
 * @property {import('../sanity/types').SanityImageMetadata} metadata
 */
/**
 * @typedef {Object} Props
 * @property {ModifiedImage} image
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
		{#snippet children({ _intersecting })}
			<div
				class="image-wrapper relative flex w-full"
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
					alt={image.alt}
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

<style>
.image-wrapper {
	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			animation:
				fade-in 500ms cubic-bezier(0.25, 0, 0.3, 1) both,
				slide-down 500ms cubic-bezier(0.25, 0, 0.3, 1) both reverse;
			animation-timeline: view();
			animation-range: 5% 20%;
		}
	}
}
</style>
