<script>
import GalleryCard from '$lib/components/gallery-card.svelte'
import MentionLink from '$lib/components/mention-link.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ galleries } = data)
</script>

<svelte:head>
	<title>Photos — Tidal Theory</title>
	<meta
		name="twitter:card"
		content={galleries[0].coverImageSet.lg
			? 'summary_large_card'
			: 'summary'}
	/>
	<meta property="og:title" content="Photos — Tidal Theory" />
	{#if galleries[0].coverImageSet.lg}<meta
			property="og:image"
			content={galleries[0].coverImageSet.lg}
		/>{/if}
</svelte:head>

<article>
	<PageIntro>
		Photos
		<TextLede slot="intro">
			Former side-hustle, current casual interest. Some of my favourite
			shots from past and ongoing&nbsp;collections.
		</TextLede>
	</PageIntro>
	<PageSection>
		<div class="grid gap-[9vh] md:gap-[11vh]">
			<div class="grid gap-4 md:grid-cols-2 md:gap-12 xl:gap-16">
				{#each galleries as gallery}
					<GalleryCard {gallery} />
				{/each}
			</div>
			<div class="prose prose-invert md:prose-xl">
				<p>
					You can find iPhone shots and more video game images from me
					on <MentionLink site="instagram">Instagram</MentionLink> and
					more photos of all kinds on&nbsp;<MentionLink site="flickr"
						>Flickr</MentionLink
					>.
				</p>
			</div>
		</div>
	</PageSection>
</article>
