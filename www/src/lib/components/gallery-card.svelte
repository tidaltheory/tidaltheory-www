<script>
import { FOCUS_OUTLINE } from '$lib/classnames'
import Badge from '$lib/components/f-badge.svelte'
import Blurhash from '$lib/components/helpers/blurhash.svelte'
//
// import Lqip from '$lib/components/helpers/lqip.svelte'

/**
 * @typedef {Object} Props
 * @property {import('../../routes/photos/$types').PageData['galleries'][number]} gallery
 */

/** @type {Props} */
let { gallery } = $props()

let {
	fullTitle,
	slug,
	coverImageSet,
	coverImageMeta,
	coverImageHotspot,
	count,
} = $derived(gallery)
let { dimensions, /* lqip, */ blurHash } = $derived(coverImageMeta)
let srcset = $derived(
	`${coverImageSet.sm} 300w, ${coverImageSet.md} 600w, ${coverImageSet.lg} 1200w,`,
)

let loaded = $state(false)

/**
 * @param {HTMLImageElement} element
 */
function load(element) {
	// eslint-disable-next-line unicorn/prefer-add-event-listener, no-return-assign
	element.onload = () => (loaded = true)
}
</script>

<div class="bg-grey-700 group relative grid grid-rows-1 rounded-[1px]">
	{#if coverImageSet}
		<div class="">
			<div
				class="absolute inset-0 mix-blend-lighten grayscale transition-all duration-200 group-focus-within:grayscale-0 group-hover:grayscale-0"
			>
				<Blurhash
					hash={blurHash}
					width={dimensions.width}
					height={dimensions.height}
					position={coverImageHotspot}
				/>
				<!-- <Lqip
					{lqip}
					width={dimensions.width}
					height={dimensions.height}
					position={coverImageHotspot}
				/> -->
			</div>
			<div
				class="relative grayscale transition-all duration-200 group-focus-within:grayscale-0 group-hover:grayscale-0"
				style:aspect-ratio={1.2}
			>
				<img
					class="relative h-full w-full object-contain transition"
					class:opacity-0={!loaded}
					loading="lazy"
					decoding="async"
					use:load
					{srcset}
					sizes="(min-width: 1024px) 34vw, (min-width: 768px) 32vw, 82vw"
					src={coverImageSet.sm}
					alt=""
				/>
			</div>
			<div
				class="bg-grey-800 absolute inset-0 mix-blend-lighten transition-opacity duration-200"
			></div>
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
					<Badge>{count}</Badge>
				{/if}
			</div>
		</a>
	</div>
</div>
