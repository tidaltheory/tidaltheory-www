<script>
import { onMount } from 'svelte'

import GalleryCarousel from '$lib/components/gallery-carousel.svelte'
import GalleryThumbnail from '$lib/components/gallery-thumbnail.svelte'
import MasonryGrid from '$lib/components/masonry-grid.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import TextLede from '$lib/components/text-lede.svelte'
import { replaceUrl } from '$lib/replace-url'

/** @type {import('./$types').PageData} */
export let data

$: ({ page, params, cleanUrl, cleanIntro } = data)
$: ({ title, subtitle, description, coverImage, images, content } = page)
$: fullTitle = subtitle ? [title, subtitle].join(' ') : title

let isCarouselOpen = false
let initialIndex = 0

async function handleOpenCarousel(index) {
	isCarouselOpen = true
	initialIndex = index
}

function handleCloseCarousel() {
	isCarouselOpen = false
	initialIndex = 0
}

onMount(() => {
	if (params.image) {
		let index = images.findIndex((item) => item.key.includes(params.image))

		handleOpenCarousel(index)
		replaceUrl(cleanUrl)
	}
})
</script>

<svelte:head>
	<title>{fullTitle} — Screen Shots — Photos — Tidal Theory</title>
	<meta name="twitter:card" content="summary_large_card" />
	<meta
		property="og:title"
		content="{fullTitle} — Screen Shots — Tidal Theory"
	/>
	<meta property="og:description" content={cleanIntro} />
	<meta property="og:image" content={`https://tidaltheory.io${coverImage}`} />
</svelte:head>

<article>
	<PageIntro {subtitle}>
		{title}
		<div slot="intro" class="grid gap-6 md:gap-10 xl:gap-12">
			{#if page.platform}
				<dl class="flex gap-4 md:gap-8 xl:gap-16">
					<div>
						<dt
							class="font-bold uppercase tracking-wider font-display text-xs"
						>
							Captured on
						</dt>
						<dd class="font-medium text-lg">{page.platform}</dd>
					</div>
					<div>
						<dt
							class="font-bold uppercase tracking-wider font-display text-xs"
						>
							Developed by
						</dt>
						<dd class="font-medium text-lg">{page.developer}</dd>
					</div>
				</dl>
			{/if}
			<TextLede>
				{@html description}
			</TextLede>
		</div>
	</PageIntro>
	<PageSection>
		<div class="grid gap-[9vh] md:gap-[11vh]">
			<MasonryGrid items={images} gapClass="gap-4 md:gap-8 xl:gap-16">
				{#each images as image, index}
					<GalleryThumbnail
						{image}
						isHidden={isCarouselOpen}
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
				{@html content}
			</div>
		</div>
	</PageSection>
</article>
