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
let { title, subtitle, lede, previousRoles, skills } = $derived(data)
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
		<div class="flex flex-wrap items-start gap-16 lg:flex-nowrap lg:gap-[72px]">
			<div
				class="prose sticky flex flex-col gap-10 lg:top-[calc(11svb_+_1.5rem)]"
			>
				<Heading level={2}>Recent experience</Heading>
			</div>
			<div
				class="flex basis-[60ch] flex-col gap-16 text-base lg:mt-0 lg:gap-20 lg:text-lg"
			>
				{#each previousRoles as role}
					<ExperienceBlock {role} />
				{/each}
			</div>
		</div>
	</PageSection>
	<PageSection>
		<div class="flex flex-wrap items-start gap-16 lg:flex-nowrap lg:gap-[72px]">
			<div
				class="prose sticky flex flex-col gap-10 lg:top-[calc(11svb_+_1.5rem)]"
			>
				<Heading level={2}>Relevant skills</Heading>
			</div>
			<div
				class="flex basis-[60ch] flex-col gap-12 text-base lg:mt-0 lg:gap-20 lg:text-lg"
			>
				{#each skills as group}
					<div class="prose">
						<h4
							class="leading-trim mb-6 text-lg font-medium text-white lg:text-xl"
						>
							{group.title}
						</h4>
						<PortableText value={group.content} />
					</div>
				{/each}
			</div>
		</div>
	</PageSection>
</article>
