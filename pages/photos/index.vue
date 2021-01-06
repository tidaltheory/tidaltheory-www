<template>
    <div>
        <Heading>Galleries</Heading>
        <pre>{{ galleries }}</pre>
        <ul>
            <li v-for="gallery of galleries" :key="gallery.slug">
                <NuxtLink :to="`/photos/${gallery.slug}`">
                    <img :src="gallery.banner" />
                    <div>
                        <h2>{{ gallery.title }}</h2>
                        <p>{{ gallery.description }}</p>
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Heading from '~/components/Heading.vue'
export default {
    components: {
        Heading,
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
