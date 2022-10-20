<script>
import GalleryCard from '$lib/components/gallery-card.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data
$: galleries = data.json
</script>

<svelte:head>
	<title>Screen Shots — Photos — Tidal Theory</title>
</svelte:head>

<article>
	<PageIntro>Screen<br />Shots</PageIntro>
	<PageSection>
		<div class="grid gap-4 md:grid-cols-2 md:gap-12 xl:gap-16">
			{#each galleries as gallery}
				<GalleryCard to="{gallery.path}/" cover={gallery.coverImage}>
					{gallery.meta.title}
				</GalleryCard>
			{/each}
		</div>
	</PageSection>
</article>
