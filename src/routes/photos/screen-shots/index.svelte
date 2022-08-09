<script context="module">
export const load = async ({ fetch }) => {
	const posts = await fetch('/api/screen-shots.json')
	const allPosts = await posts.json()

	return {
		props: {
			galleries: allPosts,
		},
	}
}
</script>

<script>
import PageIntro from '../../../components/page-intro.svelte'
import PageSection from '../../../components/page-section.svelte'
import GalleryCard from '../../../components/gallery-card.svelte'

export let galleries
</script>

<article>
	<PageIntro>Screen<br />Shots</PageIntro>
	<PageSection>
		<div class="grid md:grid-cols-2 gap-4 md:gap-12 xl:gap-16">
			{#each galleries as gallery}
				<GalleryCard to="{gallery.path}/" cover={gallery.coverImage}>
					{gallery.meta.title}
				</GalleryCard>
			{/each}
		</div>
	</PageSection>
</article>
