<script>
import { FOCUS_OUTLINE } from '$lib/classnames'
import Heading from '$lib/components/heading.svelte'
import FadeUp from '$lib/components/helpers/fade-up.svelte'
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
		<svelte:fragment slot="intro" let:intersecting>
			<FadeUp showing={intersecting} delay={100}>
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
			</FadeUp>
		</svelte:fragment>
	</PageHero>
	<!-- <PageSection>
		<div class="prose">
			<p>
				You can read more about some of the work I’ve done as <a href="/work/"
					>case studies</a
				>
				(or in <a href="/resume/">resume form</a> if you’re really interested). There’s
				also a page for side projects I’ve put out into the world and one for photos
				I’ve taken (in real life and video games).
			</p>
			<p>Thank you for visiting!</p>
		</div>
	</PageSection> -->
	<PageSection>
		<div class="prose flex flex-col gap-10">
			<Heading level={2}>Watching</Heading>
			<p>
				I make no claims about my taste in films. Expect this section to update
				frequently in October thanks to the Hooptober Challenge. Find me on <MentionLink
					site="letterboxd">Letterboxd</MentionLink
				> if you want to follow along.
			</p>
		</div>
		<div class="mt-16 flex gap-4 lg:gap-8 xl:mt-[72px] xl:gap-12">
			{#await data.streamed.films}
				<div class="bg-grey-600 aspect-[0.6667] max-h-[342px]"></div>
			{:then films}
				{#each films as film}
					<a
						href={film.link}
						class="flex-0 rounded-[1px] {FOCUS_OUTLINE} aspect-[0.6667] max-h-[342px] overflow-hidden"
					>
						<img src={film.cover} alt="" class="" />
					</a>
				{/each}
			{/await}
		</div>
	</PageSection>
	<PageSection>
		<div class="prose flex flex-col gap-10">
			<Heading level={2}>Reading</Heading>
			<p>
				Flipping through ebooks has been much better for my mental health than
				doomscrolling. I also still read to my kids regularly so there’s likely
				to be some younger fare here, in addition to the selection of
				sci-fi/fantasy stories I’m chewing through.
			</p>
		</div>
		<div class="mt-16 flex items-start gap-4 lg:gap-8 xl:mt-[72px] xl:gap-12">
			{#each data.books as book}
				<a
					href={book.link}
					class="max-w-[228px] flex-[25%] rounded-[1px] {FOCUS_OUTLINE}"
				>
					<img src={book.thumbnail} alt="" class="" />
				</a>
			{/each}
		</div>
	</PageSection>
</article>
