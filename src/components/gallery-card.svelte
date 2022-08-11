<script lang="ts">
import type { ImageRecord } from '@tidaltheory/lens'
import ImageLens from './image-lens.svelte'

export let to = '/'
export let cover: ImageRecord

const thumbnails = cover.thumbnails ?? {}
const color = cover ? cover.colors?.[0] : 'rgb(57, 62, 65)'
</script>

<div class="relative grid grid-rows-1 overflow-hidden bg-grey-700">
	{#if cover}
		<ImageLens
			image={thumbnails}
			sizes={['cover-sm', 'cover-md', 'cover-lg']}
		/>
	{/if}
	<div class="absolute inset-0 flex">
		<a
			class="peer z-10 w-full self-end before:absolute before:inset-0"
			href={to}
		>
			<div
				class="w-full bg-grey-900 bg-opacity-50 p-6 backdrop-blur firefox:bg-opacity-80 lg:p-10"
			>
				<div
					class="font-bold uppercase tracking-wide font-display text-2xl leading-trim lg:text-4xl"
				>
					<slot />
				</div>
			</div>
		</a>
		<div
			class="absolute inset-0 z-0 opacity-0 peer-hover:opacity-50"
			style:backgroundColor={color}
		/>
	</div>
</div>
