<script lang="ts">
import type { ImageRecord, ImageThumbnails } from '@tidaltheory/lens'
import { fade } from 'svelte/transition'
import LockScroll from './helpers/lock-scroll.svelte'
import Portal from './helpers/portal.svelte'

import ImageDetails from './image-details.svelte'
import ImageLens from './image-lens.svelte'

export let ref
export let images: Array<ImageRecord | ImageThumbnails>
export let onClose

function handleEscape(event: KeyboardEvent) {
	if (event.key !== 'Escape') return
	onClose()
}
</script>

<svelte:window on:keydown={handleEscape} />

<Portal>
	<LockScroll>
		<div
			bind:this={ref}
			class="fixed inset-0 z-[99] duration-200"
			transition:fade={{ duration: 150 }}
		>
			<div
				class="fixed inset-0 z-[99] bg-grey-900 bg-opacity-50 backdrop-blur transition firefox:bg-opacity-80"
			/>
			<div class="zoom" aria-modal="true" role="dialog">
				{#each images as image, index}
					<div
						class="flex snap-center items-center justify-center p-2 md:p-4 xl:p-8"
						data-index={index}
					>
						<div class="relative">
							<ImageLens {image} />
							<div class="absolute right-0 bottom-0 left-0">
								<ImageDetails id="image-{index}"
									>Image title</ImageDetails
								>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="absolute top-8 right-8 z-[100] flex">
				<button
					class="bg-transparent m-0 border-0 p-0 text-white"
					type="button"
					on:click={onClose()}
				>
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
				</button>
			</div>
		</div>
	</LockScroll>
</Portal>

<style>
.zoom {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	display: grid;
	grid: 100% / auto-flow calc(100% - 80px);
	align-content: center;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	scroll-snap-type: x mandatory;
}
</style>
