<script>
import { onMount, tick } from 'svelte'
import { self, stopPropagation } from 'svelte/legacy'
import { fade } from 'svelte/transition'

import GalleryImage from './gallery-image.svelte'
import Portal from './helpers/portal.svelte'
import TrapFocus from './helpers/trap-focus.svelte'
import IconButton from './icon-button.svelte'
import ImageDetails from './image-details.svelte'

/**
 * @typedef {Object} Props
 * @property {any} images
 * @property {number} initialIndex
 * @property {Function} onClose
 */

/** @type {Props} */
let { images, initialIndex, onClose } = $props()
/** @type {HTMLElement} */
let carousel = $state()

onMount(async () => {
	await tick()
	let target = carousel.querySelector(`[data-index="${initialIndex}"]`)
	await tick()
	target?.scrollIntoView({ block: 'center' })
})

/**
 * @param {KeyboardEvent} event
 */
function handleEscape(event) {
	if (event.key !== 'Escape') return
	onClose()
}
</script>

<svelte:window onkeydown={handleEscape} />

<Portal>
	<TrapFocus>
		<div
			bind:this={carousel}
			class="fixed inset-0 z-[99] duration-200"
			transition:fade={{ duration: 150 }}
		>
			<div
				class="bg-grey-900 fixed inset-0 z-[99] bg-opacity-50 backdrop-blur transition"
			></div>
			<div
				class="zoom"
				aria-modal="true"
				role="dialog"
				data-svelte-dialog-content
				tabindex="-1"
			>
				{#each images as image, index}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						class="flex snap-center items-center justify-center p-2 md:p-4 xl:p-8"
						data-index={index}
						role="button"
						tabindex="-1"
						onclick={self(stopPropagation(onClose))}
					>
						<div
							class="group relative flex h-auto max-h-full w-auto max-w-full object-contain"
							style:aspect-ratio={image.metadata.dimensions.aspectRatio}
						>
							<GalleryImage {image} />
							{#if image.title || image.caption}
								<div class="absolute bottom-0 left-0 right-0">
									<ImageDetails
										id="image-{index}"
										meta={{
											title: image.title,
											caption: image.caption,
										}}
									/>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			<div class="absolute right-4 top-4 z-[100] flex md:right-8 md:top-8">
				<IconButton on:click={onClose}>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</IconButton>
			</div>
		</div>
	</TrapFocus>
</Portal>

<style>
.zoom {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	display: grid;
	grid: 100% / auto-flow 100%;
	align-content: center;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	scroll-snap-type: x mandatory;
	overscroll-behavior: contain;
}
</style>
