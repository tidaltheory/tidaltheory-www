<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

/** @type {import('$lib/sanity/galleries.js').GalleryCardObject} */
export let gallery

$: ({ fullTitle, slug, coverImageSet, coverImageMeta, count } = gallery)
$: color = coverImageMeta.palette.dominant.background
$: srcset = `${coverImageSet.sm} 300w, ${coverImageSet.md} 600w, ${coverImageSet.lg} 1200w,`
</script>

<div class="bg-grey-700 group relative grid grid-rows-1 rounded-[1px]">
	{#if coverImageSet}
		<div class="">
			<div class="absolute inset-0" style:background-color={color} />
			<div
				class="relative grayscale transition-all duration-200 group-focus-within:grayscale-0 group-hover:grayscale-0"
				style:aspect-ratio={1.2}
			>
				<img
					class="relative h-full w-full object-contain transition"
					loading="lazy"
					decoding="async"
					{srcset}
					sizes="(min-width: 1024px) 34vw, (min-width: 768px) 32vw, 82vw"
					src={coverImageSet.sm}
					alt=""
				/>
			</div>
			<div
				class="bg-grey-800 absolute inset-0 mix-blend-lighten transition-opacity duration-200"
			/>
		</div>
	{/if}
	<div class="absolute inset-0 flex">
		<a
			class="z-10 flex-1 self-end rounded-[1px] before:absolute before:inset-0 {FOCUS_OUTLINE}"
			href="{slug.current}/"
		>
			<div
				class="bg-grey-900 flex items-start justify-between gap-1 bg-opacity-50 p-6 backdrop-blur lg:gap-2 lg:p-10"
			>
				<h4
					class="font-display leading-trim m-0 text-balance text-lg font-bold uppercase leading-none text-white md:text-2xl xl:text-3xl"
				>
					{fullTitle}
				</h4>
				{#if count}
					<div
						class="bg-grey-700 relative top-[0.0625rem] rounded bg-opacity-40 px-[6px] py-1 lg:px-2 lg:py-[6px]"
					>
						<span
							class="text-grey-200 leading-trim salt block text-sm lg:text-lg"
						>
							{count}
						</span>
					</div>
				{/if}
			</div>
		</a>
	</div>
</div>
