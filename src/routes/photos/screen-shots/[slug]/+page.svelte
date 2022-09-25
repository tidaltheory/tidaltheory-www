<script>
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import LensGallery from '$lib/components/lens-gallery.svelte'
import GalleryCarousel from '$lib/components/gallery-carousel.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ title, subtitle, description, images, content } = data.json)
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
	<title>{fullTitle} — Screen Shots — Photos — Tidal Theory</title>
</svelte:head>

<article>
	<PageIntro>
		{title}

		<svelte:fragment slot="subtitle"
			>{#if subtitle}{subtitle}{/if}</svelte:fragment
		>
		<svelte:fragment slot="intro">
			{@html description}
		</svelte:fragment>
	</PageIntro>
	<PageSection>
		<div class="grid gap-[10vh]">
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
