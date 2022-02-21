<script>
import PageIntro from '~/components/page-intro.vue'
import PageSection from '~/components/page-section.vue'

export default {
	components: {
		PageIntro,
		PageSection,
	},
	async asyncData({ $content, params }) {
		let article = await $content('work', params.slug).fetch()
		return { article }
	},
}
</script>

<template>
	<article>
		<PageIntro>
			{{ article.title }}
		</PageIntro>
		<PageSection>
			<NuxtContent :document="article" />
		</PageSection>
	</article>
</template>
