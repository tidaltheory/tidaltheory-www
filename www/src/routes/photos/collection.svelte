<script>
import GalleryCard from '$lib/components/gallery-card.svelte'
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import MentionLink from '$lib/components/mention-link.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {'screen-shots' | undefined} */
export let collection = undefined

/** @type {import('./$types').PageData} */
export let data
$: ({ galleries } = data)

const title = collection === 'screen-shots' ? 'Screen Shots — Photos' : 'Photos'
</script>

<svelte:head>
	<title>{title} — Tidal Theory</title>
	<meta
		name="twitter:card"
		content={galleries[0].coverImageSet.lg
			? 'summary_large_card'
			: 'summary'}
	/>
	<meta property="og:title" content="{title} — Tidal Theory" />
	{#if galleries[0].coverImageSet.lg}<meta
			property="og:image"
			content={galleries[0].coverImageSet.lg}
		/>{/if}
</svelte:head>

<article>
	<PageIntro>
		{collection === 'screen-shots' ? 'Screen Shots' : 'Photos'}
		<svelte:fragment slot="intro" let:intersecting>
			{#if collection !== 'screen-shots'}
				<FadeUp showing={intersecting} delay={100}>
					<TextLede>
						Former side-hustle, current casual interest. Some of my
						favourite shots from past and ongoing&nbsp;collections.
					</TextLede>
				</FadeUp>
			{/if}
		</svelte:fragment>
	</PageIntro>
	<PageSection>
		<div class="grid gap-[9vh] md:gap-[11vh]">
			<div class="grid gap-4 md:grid-cols-2 md:gap-12 xl:gap-16">
				{#each galleries as gallery}
					<GalleryCard {gallery} />
				{/each}
			</div>
			{#if collection !== 'screen-shots'}
				<div class="prose prose-invert md:prose-xl">
					<p>
						You can find iPhone shots and more video game images
						from me <del>on Instagram</del>
						and more photos of all kinds on&nbsp;<MentionLink
							site="flickr">Flickr</MentionLink
						>.
					</p>
				</div>
			{/if}
		</div>
	</PageSection>
</article>
