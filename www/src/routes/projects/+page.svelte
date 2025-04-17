<script>
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import ProjectArticle from '$lib/components/project-article.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/**
 * @typedef {Object} Props
 * @property {import('./$types').PageData} data
 */

/** @type {Props} */
let { data } = $props()

let { title, lede, content, projects } = $derived(data)
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
		<div class="prose prose-invert">
			<PortableText value={content} />
		</div>
	</PageSection>
	<PageSection>
		<div class="flex flex-col gap-16 md:gap-20">
			{#if projects.length > 0}
				{#each projects as project}
					<ProjectArticle {project} />
				{/each}
			{:else}
				<div class="prose">
					<p>No projects entered yet.</p>
				</div>
			{/if}
		</div>
	</PageSection>
</article>
