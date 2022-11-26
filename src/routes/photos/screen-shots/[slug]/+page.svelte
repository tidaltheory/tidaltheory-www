<script>
import { crossfade, scale } from 'svelte/transition'

import GalleryCarousel from '$lib/components/gallery-carousel.svelte'
import LensGallery from '$lib/components/lens-gallery.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ title, subtitle, description, images, content } = data.json)
$: fullTitle = subtitle ? [title, subtitle].join(' ') : title

let isCarouselOpen = null
let initialIndex = 0

const [send, receive] = crossfade({
	duration: 200,
	fallback: scale,
})

async function handleOpenCarousel(index) {
	const image = new Image()

	image.addEventListener('load', () => {
		isCarouselOpen = true
		initialIndex = index
	})
	image.src = `${images[index].path.replace(/^static/, '')}`
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
				{send}
				{receive}
			/>
			{#if isCarouselOpen}
				{#await isCarouselOpen then}
					<GalleryCarousel
						{images}
						{initialIndex}
						onClose={handleCloseCarousel}
						{send}
						{receive}
					/>
				{/await}
			{/if}
			<div class="prose prose-invert md:prose-xl">
				{@html content}
			</div>
		</div>
	</PageSection>
</article>
