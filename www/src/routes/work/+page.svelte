<script>
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

import WorkBlock from './work-block.svelte'

/**
 * @typedef {Object} Props
 * @property {import('./$types').PageData} data
 */

/** @type {Props} */
let { data } = $props()
let { title, lede, content, cases } = $derived(data)
</script>

<svelte:head>
	<title>{title} — Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="{title} — Tidal Theory" />
</svelte:head>

<article>
	<PageIntro>
		{title}
		{#snippet intro({ intersecting })}
			<FadeUp showing={intersecting} delay={100}>
				<TextLede><PortableText value={lede} /></TextLede>
			</FadeUp>
		{/snippet}
	</PageIntro>
	<PageSection>
		{#if content}
			<div class="prose mb-[11svb]">
				<PortableText value={content} />
			</div>
		{/if}
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
