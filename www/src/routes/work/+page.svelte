<script>
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

import WorkBlock from './work-block.svelte'

/** @type {import('./$types').PageData} */
export let data

$: ({ title, lede, content, cases } = data)
</script>

<svelte:head>
	<title>{title} — Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="{title} — Tidal Theory" />
</svelte:head>

<article>
	<PageIntro>
		{title}
		<FadeUp slot="intro" let:intersecting showing={intersecting} delay={100}>
			<TextLede><PortableText value={lede} /></TextLede>
		</FadeUp>
	</PageIntro>
	{#if content}
		<PageSection>
			<div class="prose prose-invert">
				<PortableText value={content} />
			</div>
		</PageSection>
	{/if}
	<PageSection>
		<div class="flex flex-col gap-[4.5rem] md:gap-28">
			{#if cases.length > 0}
				{#each cases as work}
					<WorkBlock {work} />
				{/each}
			{:else}
				<div class="prose">
					<p>No case studies entered yet.</p>
				</div>
			{/if}
		</div>
	</PageSection>
</article>
