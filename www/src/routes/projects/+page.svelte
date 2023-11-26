<script>
import FadeUp from '$lib/components/helpers/fade-up.svelte'
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
		<FadeUp
			slot="intro"
			let:intersecting
			showing={intersecting}
			delay={100}
		>
			<TextLede><PortableText value={lede} /></TextLede>
		</FadeUp>
	</PageIntro>
	<PageSection>
		<div class="prose prose-invert">
			<PortableText value={content} />
		</div>
	</PageSection>
</article>
