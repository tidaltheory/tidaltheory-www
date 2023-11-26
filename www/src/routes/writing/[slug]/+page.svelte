<script>
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import PageContent from '$lib/components/page-content.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./$types').PageData} */
export let data

$: ({ title, lede, ledeClean, coverImage, content, createdAt } = data)
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
		<div
			slot="intro"
			class="grid gap-6 md:gap-10 xl:gap-12"
			let:intersecting
		>
			<FadeUp showing={intersecting} delay={100}>
				<time datetime={data._createdAt}>{createdAt}</time>
			</FadeUp>
			<FadeUp showing={intersecting} delay={175}>
				<TextLede><PortableText value={lede} /></TextLede>
			</FadeUp>
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
