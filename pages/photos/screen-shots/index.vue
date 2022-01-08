<script>
import GalleryCard from '~/components/gallery-card.vue'
import Heading from '~/components/Heading.vue'
export default {
    components: {
        Heading,
        GalleryCard,
    },
    async asyncData({ $content, params }) {
        let galleries = await $content('photos/screen-shots', params.slug)
            .only(['slug', 'title', 'banner', 'description'])
            .sortBy('createdAt', 'asc')
            .fetch()
        return { galleries }
    },
}
</script>

<template>
    <div>
        <div class="pb-[24vh] md:pb-[20vh] xl:pb-[20vh]">
            <Heading>Screen<br />Shots</Heading>
        </div>
        <div class="grid md:grid-cols-2 gap-4 md:gap-12">
            <GalleryCard
                v-for="gallery of galleries"
                :key="gallery.slug"
                :to="`/photos/screen-shots/${gallery.slug}/`"
            >
                {{ gallery.title }}
            </GalleryCard>
        </div>
    </div>
</template>
