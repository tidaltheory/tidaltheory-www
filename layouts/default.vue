<template>
    <div :class="$style.main">
        <site-nav />
        <nuxt />
    </div>
</template>

<script lang="ts">
import SiteNav from '~/components/SiteNav.vue'
export default {
    components: {
        SiteNav,
    },
}
</script>

<style module>
.main {
    display: grid;
    width: 100vw;
    height: 100vh;
}
</style>
