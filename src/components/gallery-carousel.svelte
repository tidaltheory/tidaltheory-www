<script>
import { fade } from 'svelte/transition'

import ImageLens from './image-lens.svelte'

export let ref
export let images
export let onClose
</script>

<div
	bind:this={ref}
	class="fixed inset-0 z-[99] duration-200"
	transition:fade={{ duration: 150 }}
>
	<div
		class="fixed inset-0 z-[99] bg-grey-900 bg-opacity-50 backdrop-blur transition firefox:bg-opacity-80"
	/>
	<div class="zoom">
		{#each images as image, index}
			<button
				class="flex snap-center items-center justify-center p-2 md:p-4 xl:p-8"
				type="button"
				data-index={index}
				on:click={onClose(index)}
			>
				<ImageLens {image} />
			</button>
		{/each}
	</div>
</div>

<style>
.zoom {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	display: grid;
	grid: 100% / auto-flow 100%;
	width: 100vw;
	height: 100vh;
	overflow: auto;
	scroll-snap-type: x mandatory;
}
</style>
