<script>
import GalleryCard from '~/components/gallery-card.vue'
import PageIntro from '~/components/page-intro.vue'
import PageSection from '~/components/page-section.vue'

export default {
	components: {
		GalleryCard,
		PageIntro,
		PageSection,
	},
	async asyncData({ $content, params }) {
		let galleries = await $content('photos', params.slug)
			.only(['slug', 'title', 'banner', 'description'])
			.sortBy('createdAt', 'asc')
			.fetch()
		return { galleries }
	},
}
</script>

<template>
	<div>
		<PageIntro>
			Photos
			<template #intro>
				Former side-hustle, current casual interest. Some of my
				favourite shots from past and ongoing collections.
			</template>
		</PageIntro>
		<PageSection>
			<div class="grid md:grid-cols-2 gap-4 md:gap-12 xl:gap-16">
				<GalleryCard
					v-for="gallery of galleries"
					:key="gallery.slug"
					:to="`/photos/${gallery.slug}/`"
				>
					{{ gallery.title }}
				</GalleryCard>
			</div>
		</PageSection>
	</div>
</template>
