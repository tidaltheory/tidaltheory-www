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
	<meta
		name="twitter:card"
		content={galleries[0].coverImage ? 'summary_large_card' : 'summary'}
	/>
	<meta property="og:title" content="Screen Shots — Tidal Theory" />
	{#if galleries[0].coverImage}<meta
			property="og:image"
			content={`https://tidaltheory.io${galleries[0].coverImage}`}
		/>{/if}
</svelte:head>

<article>
	<PageIntro>Screen<br />Shots</PageIntro>
	<PageSection>
		<div class="grid gap-4 md:grid-cols-2 md:gap-12 xl:gap-16">
			{#each galleries as gallery}
				<GalleryCard
					to="{gallery.path}/"
					cover={gallery.coverImage}
					title={gallery.meta.title}
					subtitle={gallery.meta.subtitle}
				/>
			{/each}
		</div>
	</PageSection>
</article>
