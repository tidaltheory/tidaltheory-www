<template>
    <article>
        <pre>{{ article }}</pre>
        <nuxt-content :document="article" />
    </article>
</template>

<script lang="ts">
export default {
    async asyncData({ $content, params }) {
        let article = await $content('work', params.slug).fetch()

        return { article }
    },
}
</script>
