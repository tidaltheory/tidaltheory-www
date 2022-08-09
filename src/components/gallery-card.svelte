<script lang="ts">
import ImageLens from './image-lens.svelte'

export let to = '/'
export let cover: Record<string, any>

const color = cover ? ([cover.colors] as unknown as string) : 'rgb(57 62 65)'
</script>

<div class="relative grid grid-rows-1 bg-grey-700 overflow-hidden">
	{#if cover}
		<ImageLens
			image={cover.thumbnails}
			sizes={['cover-sm', 'cover-md', 'cover-lg']}
			class="grayscale"
		/>
	{/if}
	<div class="absolute inset-0 flex">
		<a
			class="peer w-full z-10 self-end before:absolute before:inset-0"
			href={to}
		>
			<div
				class="w-full p-6 lg:p-10 bg-grey-900 bg-opacity-50 backdrop-blur firefox:bg-opacity-80"
			>
				<div
					class="font-display text-2xl lg:text-4xl font-bold leading-trim tracking-wide uppercase"
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
