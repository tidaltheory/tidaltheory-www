<script>
import MentionLink from '$lib/components/mention-link.svelte'
import PageHero from '$lib/components/page-hero.svelte'
import PageSection from '$lib/components/page-section.svelte'
</script>

<svelte:head>
	<title>About — Tidal Theory</title>
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
		<p />
	</PageSection>
</article>
