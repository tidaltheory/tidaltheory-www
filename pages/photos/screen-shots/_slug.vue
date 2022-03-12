<script>
import GalleryCarousel from '~/components/gallery-carousel.vue'
import LensGallery from '~/components/lens-gallery.vue'
import PageIntro from '~/components/page-intro.vue'
import PageSection from '~/components/page-section.vue'

export default {
	components: {
                GalleryCarousel,
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

        data() {
                return {
                        isCarouselOpen: false,
                }
        },

        methods: {
                async handleOpenCarousel(index) {
                        this.isCarouselOpen = true
                        await this.$nextTick()
                        let target = this.$refs.carousel.$el.querySelector(
                                `[data-index="${index}"]`,
                        )
                        target.scrollIntoView({ block: 'center' })
                },
                handleCloseCarousel() {
                        this.isCarouselOpen = false
                },
        },
}
</script>

<template>
	<article>
		<PageIntro>
			{{ article.title }}
			<template #subtitle>{{ article.subtitle }}</template>
			<template #intro>
				<span v-html="article.description" />
				<!-- {{ article.description }} -->
			</template>
		</PageIntro>
		<PageSection>
			<div class="grid gap-[10vh]">
                                <LensGallery
                                        :images="images"
                                        :is-hidden="isCarouselOpen"
                                        :on-open="handleOpenCarousel"
                                />
                                <transition
                                        enter-active-class="transition opacity-100"
                                        leave-active-class="transition opacity-0"
                                >
                                        <GalleryCarousel
                                                v-if="isCarouselOpen"
                                                ref="carousel"
                                                :images="images"
                                                :on-close="handleCloseCarousel"
                                        />
                                </transition>
				<NuxtContent
					:document="article"
					class="prose md:prose-xl prose-invert"
				/>
			</div>
		</PageSection>
	</article>
</template>
