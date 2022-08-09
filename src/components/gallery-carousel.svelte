<script>
import ImageLens from './image-lens.svelte'

export let images
// export let isOpen = false
export let onClose
</script>

<div class="fixed inset-0 z-[99] duration-200">
	<div
		class="fixed inset-0 z-[99] bg-grey-900 bg-opacity-50 backdrop-blur firefox:bg-opacity-80 transition"
	/>
	<div class="zoom">
		{#each images as image, index}
			<button
				class="flex items-center justify-center p-2 md:p-4 xl:p-8 snap-center"
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
