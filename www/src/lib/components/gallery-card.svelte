<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import Heading from './heading.svelte'

/** @type {import('$lib/sanity/galleries.js').GalleryCardObject} */
export let gallery

$: ({ fullTitle, slug, coverImageSet, coverImageMeta, count } = gallery)
$: color = coverImageMeta.palette.dominant.background
$: srcset = `${coverImageSet.sm} 300w, ${coverImageSet.md} 600w, ${coverImageSet.lg} 1200w,`
</script>

<div class="group relative grid grid-rows-1 rounded-[1px] bg-grey-700">
	{#if coverImageSet}
		<div class="">
			<div class="absolute inset-0" style:background-color={color} />
			<div
				class="relative grayscale transition-all duration-200 group-focus-within:grayscale-0 group-hover:grayscale-0"
			>
				<img
					class="h-full w-full object-contain"
					loading="lazy"
					decoding="async"
					{srcset}
					sizes="(min-width: 1024px) 34vw, (min-width: 768px) 32vw, 82vw"
					src={coverImageSet.sm}
					alt=""
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
			href="{slug.current}/"
		>
			<div
				class="flex items-start justify-between bg-grey-900 bg-opacity-50 p-6 backdrop-blur lg:p-10"
			>
				<Heading level={4}>{fullTitle}</Heading>
				{#if count}
					<div
						class="relative top-[0.0625rem] rounded bg-grey-700 px-2 py-[6px]"
					>
						<span class="block text-grey-200 text-lg leading-trim">
							{count}
						</span>
					</div>
				{/if}
			</div>
		</a>
	</div>
</div>
