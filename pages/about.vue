<script>
import MentionLink from '~/components/mention-link.vue'
import PageHero from '~/components/page-hero.vue'
import PageSection from '~/components/page-section.vue'

export default {
	components: {
		PageHero,
		MentionLink,
		PageSection,
	},
}
</script>

<template>
	<article>
		<PageHero>
			I’m<br />
			Jeff<br />
			Nelson
			<template #intro>
				I’m a User Interface Developer, currently at
				<span class="whitespace-nowrap"
					><MentionLink site="clari">Clari</MentionLink>.</span
				>
				Previously, I’ve worked at
				<MentionLink site="showbie">Showbie</MentionLink>
				and at
				<span class="whitespace-nowrap"
					><MentionLink site="lift">Lift Interactive</MentionLink
					>.</span
				></template
			>
		</PageHero>
		<PageSection>
			<p></p>
		</PageSection>
	</article>
</template>
