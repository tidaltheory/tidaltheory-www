<script>
import Heading from '$lib/components/heading.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

import ExperienceBlock from './experience-block.svelte'

/**
 * @typedef {Object} Props
 * @property {import('./$types').PageData} data
 */

/** @type {Props} */
let { data } = $props()
let { title, subtitle, lede, previousRoles } = $derived(data)
</script>

<svelte:head>
	<title>Resume — Tidal Theory</title>
	<meta property="og:title" content="Resume — Tidal Theory" />
</svelte:head>

<article>
	<PageIntro {subtitle}>
		{title}
		{#snippet intro()}
			<TextLede>
				<PortableText value={lede} />
			</TextLede>
		{/snippet}
	</PageIntro>
	<PageSection>
		<div class="prose flex flex-col gap-10">
			<Heading level={2}>Recent experience</Heading>
		</div>
		<div class="mt-16 flex flex-col gap-4 lg:gap-20 xl:mt-[72px]">
			{#each previousRoles as role}
				<ExperienceBlock {role} />
			{/each}
		</div>
	</PageSection>
</article>
