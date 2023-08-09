<script>
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import RelativeDate from '$lib/components/relative-date.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ notes } = data)
</script>

<svelte:head>
	<title>Writing — Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="Notes — Tidal Theory" />
</svelte:head>

<article>
	<PageIntro>
		Notes
		<!-- <TextLede slot="intro">Coming soon.</TextLede> -->
	</PageIntro>
	<PageSection>
		<div class="prose prose-invert">
			{#each notes as note}
				<a href="/notes/{note.slug.current}/">
					<RelativeDate date={note._createdAt} />
				</a>
			{/each}
		</div>
	</PageSection>
</article>
