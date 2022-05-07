<script>
import PageHero from '~/components/page-hero.vue'

export default {
	components: {
		PageHero,
	},
}
</script>

<template>
	<article>
		<PageHero>
			Tidal<br />Theory
			<template #intro>
				User Interface Developer,<br />currently working at Clari.
			</template>
		</PageHero>
	</article>
</template>
