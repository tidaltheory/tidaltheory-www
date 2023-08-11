<script>
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./$types').PageData} */
export let data

$: ({ title, lede, content } = data)
</script>

<svelte:head>
	<title>{title} — Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="{title} — Tidal Theory" />
</svelte:head>

<article>
	<PageIntro>
		{title}
		<TextLede slot="intro"><PortableText value={lede} /></TextLede>
	</PageIntro>
	<PageSection>
		<div class="prose prose-invert">
			<PortableText value={content} />
		</div>
	</PageSection>
</article>
