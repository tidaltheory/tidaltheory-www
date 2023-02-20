<script>
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data

$: ({ title, content } = data)
</script>

<svelte:head>
	<title>{title} — Tidal Theory</title>
	<meta property="og:title" content="{title} — Tidal Theory" />
	<!-- <meta property="og:description" content={excerpt} /> -->
</svelte:head>

<article>
	<PageIntro>
		{title}
	</PageIntro>
	<PageSection>
		<div class="max-w-5xl">
			<div class="prose prose-invert">
				{@html content}
			</div>
		</div>
	</PageSection>
</article>
