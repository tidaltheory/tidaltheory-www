<script>
import GalleryCarousel from '$lib/components/gallery-carousel.svelte'
import LensGallery from '$lib/components/lens-gallery.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ title, subtitle, description, coverImage, images, content, cleanIntro } =
	data.json)
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
</script>

<svelte:head>
	<title>{fullTitle} — Photos — Tidal Theory</title>
	<meta property="og:title" content="{fullTitle} — Tidal Theory" />
	<meta property="og:description" content={cleanIntro} />
	<meta property="og:image" content={`https://tidaltheory.io${coverImage}`} />
</svelte:head>

<article>
	<PageIntro {subtitle}>
		{title}
		<svelte:fragment slot="intro">
			{@html description}
		</svelte:fragment>
	</PageIntro>
	<PageSection>
		<div class="grid gap-[9vh] md:gap-[11vh]">
			<LensGallery
				{images}
				isHidden={isCarouselOpen}
				onOpen={handleOpenCarousel}
			/>
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
