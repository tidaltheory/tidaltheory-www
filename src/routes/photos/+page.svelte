<script>
import GalleryCard from '$lib/components/gallery-card.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'

// Suggestion (check code before using, and possibly convert to data.X access later):
/** @type {import('./$types').PageData} */
export let data
$: posts = data.json
</script>

<svelte:head>
	<title>Photos — Tidal Theory</title>
</svelte:head>

<article>
	<PageIntro>
		Photos
		<svelte:fragment slot="intro">
			Former side-hustle, current casual interest. Some of my favourite
			shots from past and ongoing collections.
		</svelte:fragment>
	</PageIntro>
	<PageSection>
		<div class="grid gap-4 md:grid-cols-2 md:gap-12 xl:gap-16">
			{#each posts as gallery}
				<GalleryCard
					to="{gallery.path}/"
					cover={gallery.coverImage}
					title={gallery.meta.title}
				/>
			{/each}
		</div>
	</PageSection>
</article>
