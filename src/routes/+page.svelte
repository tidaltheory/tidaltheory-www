<script>
import GalleryCard from '$lib/components/gallery-card.svelte'
import Heading from '$lib/components/heading.svelte'
import MoreLink from '$lib/components/more-link.svelte'
import PageHero from '$lib/components/page-hero.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ recentGalleries } = data.json)
</script>

<svelte:head>
	<title>Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="Tidal Theory" />
</svelte:head>

<article>
	<PageHero>
		Tidal<br />Theory
		<svelte:fragment slot="intro">
			User Interface Developer,<br />video game photographer,<br />based
			in Edmonton, Canada.
		</svelte:fragment>
	</PageHero>
	<PageSection>
		<div class="grid gap-8 md:gap-12 lg:grid-cols-2">
			<div class="flex flex-col gap-12">
				<Heading level="2">Recent<br />Galleries</Heading>
				<div class="hidden xl:flex">
					<MoreLink href="/photos/">See all galleries</MoreLink>
				</div>
			</div>
			<div
				class="flex flex-wrap gap-8 md:col-span-2 md:row-start-2 md:flex-nowrap md:gap-12 xl:col-span-1 xl:col-start-2 xl:row-start-1 xl:flex-wrap"
			>
				{#each recentGalleries as gallery}
					<GalleryCard
						to="{gallery.path}/"
						cover={gallery.coverImage}
						title={gallery.meta.title}
						subtitle={gallery.meta.subtitle}
					/>
				{/each}
			</div>
			<div class="row-start-3 flex xl:hidden">
				<MoreLink href="/photos/">See all galleries</MoreLink>
			</div>
		</div>
	</PageSection>
</article>
