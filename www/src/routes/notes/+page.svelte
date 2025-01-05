<script>
import { FOCUS_OUTLINE } from '$lib/classnames.js'
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
				<div class="prose prose-lg md:prose-xl">
					<PortableText value={note.content} />
					<span class="not-prose text-grey-400">
						<a
							class="inline-flex rounded-[1px] underline decoration-[transparent] decoration-[0.0781em] underline-offset-[calc(0.0781em_*_2)] transition hover:decoration-[inherit] {FOCUS_OUTLINE}"
							href="/notes/{note.slug.current}/"
						>
							<RelativeDate date={note._createdAt} />
						</a>
					</span>
				</div>
			{/each}
		</div>
	</PageSection>
</article>
