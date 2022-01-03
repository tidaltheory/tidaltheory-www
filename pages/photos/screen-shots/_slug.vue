<script>
import Heading from '~/components/Heading.vue'
export default {
    components: {
        Heading,
    },
    async asyncData({ $content, params }) {
        let article = await $content('photos/screen-shots', params.slug).fetch()
        return { article }
    },
}
</script>

<template>
    <article>
        <Heading>{{ article.title }}</Heading>
        <pre>{{ article }}</pre>
        <nuxt-content :document="article" />
    </article>
</template>
