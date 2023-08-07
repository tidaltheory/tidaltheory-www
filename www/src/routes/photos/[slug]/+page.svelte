<script>
import GalleryCarousel from '$lib/components/gallery-carousel.svelte'
import GalleryThumbnail from '$lib/components/gallery-thumbnail.svelte'
import MasonryGrid from '$lib/components/masonry-grid.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ title, subtitle, description, coverImage, images, content, cleanIntro } =
	data.json)
$: fullTitle = subtitle ? [title, subtitle].join(' ') : title

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
</script>

<svelte:head>
	<title>{fullTitle} — Photos — Tidal Theory</title>
	<meta name="twitter:card" content="summary_large_card" />
	<meta property="og:title" content="{fullTitle} — Tidal Theory" />
	<meta property="og:description" content={cleanIntro} />
	<meta property="og:image" content={`https://tidaltheory.io${coverImage}`} />
</svelte:head>

<article>
	<PageIntro {subtitle}>
		{title}
		<TextLede slot="intro">
			{@html description}
		</TextLede>
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
			<div class="prose prose-invert md:prose-xl">
				{@html content}
			</div>
		</div>
	</PageSection>
</article>
