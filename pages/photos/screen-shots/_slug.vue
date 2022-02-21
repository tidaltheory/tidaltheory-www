<script>
import ImageLens from '~/components/image-lens.vue'
import PageIntro from '~/components/page-intro.vue'
import PageSection from '~/components/page-section.vue'

export default {
	components: {
		PageIntro,
		PageSection,
		ImageLens,
	},

	async asyncData({ $content, params }) {
		let article = await $content('photos/screen-shots', params.slug).fetch()
		let { library } = await $content('imagemeta').fetch()
		let images = []
		article.images.forEach((key) => images.push(library[key]))

		return { article, images }
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
			<div>
				<ImageLens
					v-for="(image, i) in images"
					:key="i"
					:image="image"
				/>
			</div>
		</PageSection>
	</article>
</template>
