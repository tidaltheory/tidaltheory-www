<script>
export default {
    async asyncData({ $content, params }) {
        let article = await $content('work', params.slug).fetch()

        return { article }
    },
}
</script>

<template>
    <article>
        <pre>{{ article }}</pre>
        <NuxtContent :document="article" />
    </article>
</template>
