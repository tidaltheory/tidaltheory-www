<script>
import GalleryCard from '$lib/components/gallery-card.svelte'
import MentionLink from '$lib/components/mention-link.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./$types').PageData} */
export let data
$: posts = data.json
</script>

<svelte:head>
	<title>Photos — Tidal Theory</title>
	<meta
		name="twitter:card"
		content={posts[0].coverImage ? 'summary_large_card' : 'summary'}
	/>
	<meta property="og:title" content="Photos — Tidal Theory" />
	{#if posts[0].coverImage}<meta
			property="og:image"
			content={`https://tidaltheory.io${posts[0].coverImage}`}
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
				{#each posts as gallery}
					<GalleryCard
						to="{gallery.path}/"
						cover={gallery.coverImage}
						title={gallery.meta.title}
						count={gallery.meta.images?.length}
					/>
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
