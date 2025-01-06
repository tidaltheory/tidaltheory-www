<script>
import { MasonryGrid } from '@egjs/svelte-grid'

import GalleryCarousel from '$lib/components/gallery-carousel.svelte'
import GalleryThumbnail from '$lib/components/gallery-thumbnail.svelte'
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

import { media } from '../../stores/media-queries.js'

/** @type {'screen-shots' | undefined} */
export let collection = undefined

/** @type {string} */
export let slug

/** @type {import('./[slug]/$types').PageData} */
export let data
$: ({ post } = data)
$: ({
	title,
	subtitle,
	fullTitle,
	lede,
	ledeClean,
	coverImage,
	images,
	content,
} = post)

if (collection === 'screen-shots') fullTitle += ' — Screen Shots'

let url = ['https://tidaltheory.io/photos', collection, slug].join('/')

let isCarouselOpen = false
let initialIndex = 0

/**
 * @param {number} index
 */
async function handleOpenCarousel(index) {
	isCarouselOpen = true
	initialIndex = index
}

function handleCloseCarousel() {
	isCarouselOpen = false
	initialIndex = 0
}

let gridGap = 16

$: if ($media.xl) {
	gridGap = 64
} else if ($media.md) {
	gridGap = 32
}
</script>

<svelte:head>
	<title>{fullTitle} — Photos — Tidal Theory</title>
	<meta name="twitter:card" content="summary_large_card" />
	<meta property="og:title" content="{fullTitle} — Tidal Theory" />
	<meta property="og:description" content={ledeClean} />
	<meta property="og:url" content="{url}/" />
	<meta property="og:image" content={coverImage} />
</svelte:head>

<article>
	<PageIntro {subtitle}>
		{title}
		<div
			slot="intro"
			class="grid gap-6 md:gap-10 xl:gap-12"
			let:intersecting
		>
			{#if post.platform}
				<dl class="flex flex-col gap-4 md:flex-row md:gap-8 xl:gap-16">
					<FadeUp
						showing={intersecting}
						delay={100}
						className="grid gap-1 md:gap-2"
					>
						<dt
							class="font-display leading-trim text-xs font-bold uppercase tracking-wider"
						>
							Captured on
						</dt>
						<dd
							class="leading-trim text-base font-medium md:text-lg"
						>
							{post.platform}
						</dd>
					</FadeUp>
					<FadeUp
						showing={intersecting}
						delay={175}
						className="grid gap-1 md:gap-2"
					>
						<dt
							class="font-display leading-trim text-xs font-bold uppercase tracking-wider"
						>
							Developed by
						</dt>
						<dd
							class="leading-trim text-base font-medium md:text-lg"
						>
							{post.developer}
						</dd>
					</FadeUp>
				</dl>
			{/if}
			<FadeUp showing={intersecting} delay={250}>
				<TextLede>
					<PortableText value={lede} />
				</TextLede>
			</FadeUp>
		</div>
	</PageIntro>
	<PageSection>
		<div class="grid gap-[9vh] md:gap-[11vh]">
			<MasonryGrid align="stretch" column={2} gap={gridGap}>
				{#each images as image, index}
					<GalleryThumbnail
						{image}
						isHidden={isCarouselOpen}
						isDelayed={(index + 1) % 2 === 0}
						onClick={() => handleOpenCarousel(index)}
					/>
				{/each}
			</MasonryGrid>
			{#if isCarouselOpen}
				<GalleryCarousel
					{images}
					{initialIndex}
					onClose={handleCloseCarousel}
				/>
			{/if}
			<div class="prose prose-invert">
				<PortableText value={content} />
			</div>
		</div>
	</PageSection>
</article>
