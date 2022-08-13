<script context="module">
export const load = async ({ fetch }) => {
	const posts = await fetch('/api/photos.json')
	const allPosts = await posts.json()

	return {
		props: {
			posts: allPosts,
		},
	}
}
</script>

<script>
import PageSection from '../../components/page-section.svelte'
import PageIntro from '../../components/page-intro.svelte'
import GalleryCard from '../../components/gallery-card.svelte'

export let posts
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
				<GalleryCard to="{gallery.path}/" cover={gallery.coverImage}>
					{gallery.meta.title}
				</GalleryCard>
			{/each}
		</div>
	</PageSection>
</article>
