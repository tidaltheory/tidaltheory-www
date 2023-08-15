<script>
import GalleryCarousel from '$lib/components/gallery-carousel.svelte'
import GalleryThumbnail from '$lib/components/gallery-thumbnail.svelte'
import MasonryGrid from '$lib/components/masonry-grid.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./$types').PageData} */
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
	<meta property="og:description" content={ledeClean} />
	<meta property="og:image" content={coverImage} />
</svelte:head>

<article>
	<PageIntro {subtitle}>
		{title}
		<TextLede slot="intro">
			<PortableText value={lede} />
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
				<PortableText value={content} />
			</div>
		</div>
	</PageSection>
</article>
