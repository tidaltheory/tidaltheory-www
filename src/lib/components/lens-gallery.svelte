<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import ImageLens from './image-lens.svelte'
import MasonryGrid from './masonry-grid.svelte'

export let images
export let isHidden
export let onOpen
export let send
export let receive
</script>

<MasonryGrid items={images} gapClass="gap-4 md:gap-8 xl:gap-16">
	{#each images as item, index}
		<button
			class="flex w-full rounded-[1px] transition {FOCUS_OUTLINE}"
			type="button"
			class:opacity-30={isHidden}
			data-index={index}
			on:click={onOpen(index)}
			in:receive={{ key: index }}
			out:send={{ key: index }}
		>
			<ImageLens
				image={item.thumbnails}
				sizes={['gallery-sm', 'gallery-md', 'gallery-lg']}
			/>
		</button>
	{/each}
</MasonryGrid>
