<script>
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import ProjectArticle from '$lib/components/project-article.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./$types').PageData} */
export let data

$: ({ title, lede, content, projects } = data)
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
