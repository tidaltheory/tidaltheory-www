<script>
import Divider from '$lib/components/divider.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import RelativeDate from '$lib/components/relative-date.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ notes } = data)
</script>

<svelte:head>
	<title>Notes — Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="Notes — Tidal Theory" />
</svelte:head>

<article>
	<PageIntro>
		Notes
		<!-- <TextLede slot="intro">Coming soon.</TextLede> -->
	</PageIntro>
	<PageSection>
		<div class="flex flex-col gap-8">
			{#each notes as note, index}
				{#if index !== 0}<Divider />{/if}
				<div class="prose prose-invert prose-lg md:prose-xl">
					<PortableText value={note.content} />
					<a href="/notes/{note.slug.current}/">
						<RelativeDate date={note._createdAt} />
					</a>
				</div>
			{/each}
		</div>
	</PageSection>
</article>
