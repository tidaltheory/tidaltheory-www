<script>
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import PageContent from '$lib/components/page-content.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/**
 * @typedef {Object} Props
 * @property {import('./$types').PageData} data
 */

/** @type {Props} */
let { data } = $props()
let { title, lede, ledeClean, coverImage, content, publishedOn, editedOn } =
	$derived(data)
</script>

<svelte:head>
	<title>{title} — Tidal Theory</title>
	<meta
		name="twitter:card"
		content={coverImage ? 'summary_large_card' : 'summary'}
	/>
	<meta property="og:title" content="{title} — Tidal Theory" />
	<meta property="og:description" content={ledeClean} />
	{#if coverImage}<meta
			property="og:image"
			content={`https://tidaltheory.io${coverImage}`}
		/>{/if}
</svelte:head>

<article>
	<PageIntro>
		{title}
		{#snippet intro({ intersecting })}
			<div class="grid gap-5 md:gap-6">
				<FadeUp showing={intersecting} delay={100}>
					<p
						class="text-grey-400 leading-trim salt text-base font-medium md:text-lg"
					>
						{#if editedOn}
							<time datetime={data.edited}>{editedOn}</time> (Originally
							published
							<time datetime={data.published}>{publishedOn}</time>)
						{:else}
							<time datetime={data.published}>{publishedOn}</time>
						{/if}
					</p>
				</FadeUp>
				<FadeUp showing={intersecting} delay={175}>
					<TextLede><PortableText value={lede} /></TextLede>
				</FadeUp>
			</div>
		{/snippet}
	</PageIntro>
	<PageContent>
		<div class="wrapper prose relative">
			<PortableText value={content} />
		</div>
	</PageContent>
</article>

<style>
.wrapper {
	container: prose / inline-size;
	/* grid-column: content; */
}
</style>
