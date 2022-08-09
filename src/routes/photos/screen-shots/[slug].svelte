<script context="module">
export const load = async ({ params, fetch }) => {
	const posts = await fetch(`/api/photos/screen-shots/${params.slug}.json`)
	const allPosts = await posts.json()

	return {
		props: {
			article: allPosts,
		},
	}
}
</script>

<script>
import { fade } from 'svelte/transition'

import PageIntro from '../../../components/page-intro.svelte'
import PageSection from '../../../components/page-section.svelte'
import LensGallery from '../../../components/lens-gallery.svelte'
import GalleryCarousel from '../../../components/gallery-carousel.svelte'
import { tick } from 'svelte'

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
				<div transition:fade={{ duration: 150 }} bind:this={carousel}>
					<GalleryCarousel
						images={article.images}
						isOpen={isCarouselOpen}
						onClose={handleCloseCarousel}
					/>
				</div>
			{/if}
			<div class="prose md:prose-xl prose-invert">
				{@html article.content}
			</div>
		</div>
	</PageSection>
</article>
