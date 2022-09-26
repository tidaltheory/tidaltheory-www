<script lang="ts">
import type { ImageRecord, ImageThumbnails } from '@tidaltheory/lens'
import { onMount, tick } from 'svelte'
import { fade } from 'svelte/transition'

import Portal from './helpers/portal.svelte'
import TrapFocus from './helpers/trap-focus.svelte'
import IconButton from './icon-button.svelte'
import ImageDetails from './image-details.svelte'
import ImageLens from './image-lens.svelte'

export let images: Array<ImageRecord | ImageThumbnails>
export let initialIndex: number
export let onClose: () => void

let carousel: HTMLElement

onMount(async () => {
	await tick()
	let target = carousel.querySelector(`[data-index="${initialIndex}"]`)
	await tick()
	target?.scrollIntoView({ block: 'center' })
})

function handleEscape(event: KeyboardEvent) {
	if (event.key !== 'Escape') return
	onClose()
}
</script>

<svelte:window on:keydown={handleEscape} />

<Portal>
	<TrapFocus>
		<div
			bind:this={carousel}
			class="fixed inset-0 z-[99] duration-200"
			transition:fade={{ duration: 150 }}
		>
			<div
				class="fixed inset-0 z-[99] bg-grey-900 bg-opacity-50 backdrop-blur transition"
				on:click|self|stopPropagation={onClose}
			/>
			<div
				class="zoom"
				aria-modal="true"
				role="dialog"
				data-svelte-dialog-content
				tabindex="-1"
			>
				{#each images as image, index}
					<div
						class="flex snap-center items-center justify-center p-2 md:p-4 xl:p-8"
						data-index={index}
					>
						<div class="relative">
							<ImageLens {image} lazyLoad={false} />
							<div class="absolute right-0 bottom-0 left-0">
								<ImageDetails id="image-{index}"
									>Image title</ImageDetails
								>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div
				class="absolute top-4 right-4 z-[100] flex md:top-8 md:right-8"
			>
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
	grid: 100% / auto-flow calc(100% - 80px);
	align-content: center;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	scroll-snap-type: x mandatory;
	overscroll-behavior: contain;
}
</style>
