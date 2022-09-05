<script>
import MasonryGrid from './masonry-grid.svelte'
import ImageLens from './image-lens.svelte'

export let images
export let isHidden
export let onOpen
</script>

<MasonryGrid items={images} gapClass="gap-4 md:gap-8 xl:gap-16">
	{#each images as item, index}
		<button
			class="transition"
			type="button"
			class:opacity-30={isHidden}
			data-index={index}
			on:click={onOpen(index)}
		>
			<ImageLens
				image={item.thumbnails}
				sizes={['gallery-sm', 'gallery-md', 'gallery-lg']}
			/>
		</button>
	{/each}
</MasonryGrid>
