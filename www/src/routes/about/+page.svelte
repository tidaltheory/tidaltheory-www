<script>
import { FOCUS_OUTLINE } from '$lib/classnames'
import Heading from '$lib/components/heading.svelte'
import MentionLink from '$lib/components/mention-link.svelte'
import PageHero from '$lib/components/page-hero.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data
</script>

<svelte:head>
	<title>About — Tidal Theory</title>
	<meta property="og:title" content="About — Tidal Theory" />
</svelte:head>

<article>
	<PageHero>
		I’m<br />
		Jeff<br />
		Nelson
		<svelte:fragment slot="intro">
			I’m a User Interface Developer, currently at
			<span class="whitespace-nowrap"
				><MentionLink site="clari">Clari</MentionLink>.</span
			>
			Previously, I’ve worked at
			<MentionLink site="showbie">Showbie</MentionLink>
			and at
			<span class="whitespace-nowrap"
				><MentionLink site="lift">Lift Interactive</MentionLink>.</span
			>
		</svelte:fragment>
	</PageHero>
	<PageSection>
		<div class="prose flex flex-col gap-10">
			<Heading level={2}>Watching</Heading>
			<p class="not-prose">
				I make no claims about my taste in films. Expect this section to
				update frequently in October thanks to the Hooptober Challenge.
				Find me on <MentionLink site="letterboxd"
					>Letterboxd</MentionLink
				> if you want to follow along.
			</p>
		</div>
		<div class="mt-16 flex gap-8 xl:mt-[72px] xl:gap-12">
			{#await data.films}
				<div class="bg-grey-600 h-[342px] w-[228px]"></div>
			{:then films}
				{#each films as film}
					<a
						href={film.link}
						class="flex-0 rounded-[1px] {FOCUS_OUTLINE} min-w-[228px] overflow-hidden"
					>
						<img
							src={film.cover}
							alt=""
							class="aspect-[0.6667] max-h-[342px]"
						/>
					</a>
				{/each}
			{/await}
		</div>
	</PageSection>
</article>
