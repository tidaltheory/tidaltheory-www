<script>
import LensGallery from '~/components/lens-gallery.vue'
import PageIntro from '~/components/page-intro.vue'
import PageSection from '~/components/page-section.vue'

export default {
	components: {
		LensGallery,
		PageIntro,
		PageSection,
	},

	async asyncData({ $content, params }) {
		let article = await $content('photos/screen-shots', params.slug).fetch()
		let { library } = await $content('imagemeta').fetch()
		let images = []
		if (article.images) {
			article.images.forEach((key) => images.push(library[key]))
		}

		return { article, images }
	},
}
</script>

<template>
	<article>
		<PageIntro>
			{{ article.title }}
			<template #intro>
				<span v-html="article.description" />
				<!-- {{ article.description }} -->
			</template>
		</PageIntro>
		<PageSection>
			<div class="grid gap-[10vh]">
				<LensGallery :images="images" />
				<NuxtContent
					:document="article"
					class="prose md:prose-xl prose-invert"
				/>
			</div>
		</PageSection>
	</article>
</template>
