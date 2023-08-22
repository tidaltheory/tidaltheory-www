<script>
import Divider from '$lib/components/divider.svelte'
import Heading from '$lib/components/heading.svelte'
import PageHero from '$lib/components/page-hero.svelte'
import PageSection from '$lib/components/page-section.svelte'
import Update from '$lib/components/update.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ updates } = data)
</script>

<svelte:head>
	<title>Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="Tidal Theory" />
</svelte:head>

<article>
	<PageHero>
		Tidal<br />Theory
		<svelte:fragment slot="intro">
			User Interface Developer,<br />video game photographer,<br />based
			in Edmonton, Canada.
		</svelte:fragment>
	</PageHero>
	<PageSection>
		{#if updates}
			<div class="grid gap-8 md:gap-12 xl:gap-[4.5rem]">
				<Heading level={2}>Latest Changes</Heading>
				<div class="grid gap-2 md:gap-4">
					{#each updates as update, index}
						{#if index !== 0}<Divider />{/if}
						<Update {update} />
					{/each}
				</div>
			</div>
		{/if}
	</PageSection>
</article>
