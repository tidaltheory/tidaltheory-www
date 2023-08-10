<script>
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ posts } = data)
</script>

<svelte:head>
	<title>Writing — Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="Writing — Tidal Theory" />
</svelte:head>

<article>
	<PageIntro>
		Writing
		<!-- <TextLede slot="intro">Coming soon.</TextLede> -->
	</PageIntro>
	<PageSection>
		<div class="prose prose-invert">
			{#each posts as post}
				<a href="/writing/{post.slug.current}/">{post.title}</a>
			{/each}
		</div>
	</PageSection>
</article>
