<script context="module">
export const load = async ({ params, fetch }) => {
	const res = await fetch(`/api/photos/screen-shots/${params.slug}.json`)
	const { data } = await res.json()
	const article = data

	return {
		props: {
			article,
		},
	}
}
</script>

<script>
import { tick } from 'svelte'

import PageIntro from '../../../components/page-intro.svelte'
import PageSection from '../../../components/page-section.svelte'
import LensGallery from '../../../components/lens-gallery.svelte'
import GalleryCarousel from '../../../components/gallery-carousel.svelte'

export let article

let carousel
let isCarouselOpen = false

async function handleOpenCarousel(index) {
	isCarouselOpen = true
	await tick()

	let target = carousel.querySelector(`[data-index="${index}"]`)

	await tick()
	target.scrollIntoView({ block: 'center' })
}

function handleCloseCarousel() {
	isCarouselOpen = false
}
</script>

<svelte:head>
	<title
		>{article.title}
		{article.subtitle} — Screen Shots — Photos — Tidal Theory</title
	>
</svelte:head>

<article>
	<PageIntro>
		{article.title}

		<svelte:fragment slot="subtitle">{article.subtitle}</svelte:fragment>
		<svelte:fragment slot="intro">
			{@html article.description}
		</svelte:fragment>
	</PageIntro>
	<PageSection>
		<div class="grid gap-[10vh]">
			<LensGallery
				images={article.images}
				isHidden={isCarouselOpen}
				onOpen={handleOpenCarousel}
			/>
			{#if isCarouselOpen}
				<GalleryCarousel
					bind:ref={carousel}
					images={article.images}
					isOpen={isCarouselOpen}
					onClose={handleCloseCarousel}
				/>
			{/if}
			<div class="prose prose-invert md:prose-xl">
				{@html article.content}
			</div>
		</div>
	</PageSection>
</article>
