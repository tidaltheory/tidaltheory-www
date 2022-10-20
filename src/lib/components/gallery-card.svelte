<script lang="ts">
import type { ImageRecord } from '@tidaltheory/lens'

import { FOCUS_OUTLINE } from '$lib/classnames'

import Heading from './heading.svelte'
import ImageLens from './image-lens.svelte'

export let to = '/'
export let cover: ImageRecord

const thumbnails = cover.thumbnails ?? {}
// Const color = cover ? cover.colors?.[0] : 'rgb(57, 62, 65)'
</script>

<div class="group relative grid grid-rows-1 rounded-[1px] bg-grey-700">
	{#if cover}
		<div class="">
			<div
				class="absolute inset-0"
				style:background-color={cover.colors.dominant}
			/>
			<div
				class="relative grayscale transition-all duration-200 group-focus-within:grayscale-0 group-hover:grayscale-0"
			>
				<ImageLens
					image={thumbnails}
					sizes={['cover-sm', 'cover-md', 'cover-lg']}
				/>
			</div>
			<div
				class="absolute inset-0 bg-grey-800 mix-blend-lighten transition-opacity duration-200"
			/>
		</div>
	{/if}
	<div class="absolute inset-0 flex">
		<a
			class="z-10 flex-1 self-end rounded-[1px] before:absolute before:inset-0 {FOCUS_OUTLINE}"
			href={to}
		>
			<div class="bg-grey-900 bg-opacity-50 p-6 backdrop-blur lg:p-10">
				<Heading level={4}>
					<slot />
				</Heading>
			</div>
		</a>
	</div>
</div>
