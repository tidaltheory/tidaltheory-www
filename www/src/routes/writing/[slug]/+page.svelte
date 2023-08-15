<script>
import PageContent from '$lib/components/page-content.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./$types').PageData} */
export let data

$: ({ title, lede, ledeClean, coverImage, content } = data)
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
		<div slot="intro">
			<p>{data._createdAt}</p>
			<TextLede><PortableText value={lede} /></TextLede>
		</div>
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
