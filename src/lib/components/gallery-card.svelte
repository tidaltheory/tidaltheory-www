<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import Heading from './heading.svelte'
import ImageLens from './image-lens.svelte'

export let to = '/'
/** @type {import('@tidaltheory/lens').ImageRecord} */
export let cover
export let title
export let subtitle

const thumbnails = cover.thumbnails ?? {}
$: fullTitle = subtitle ? [title, subtitle].join(' ') : title
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
					{fullTitle}
				</Heading>
			</div>
		</a>
	</div>
</div>
