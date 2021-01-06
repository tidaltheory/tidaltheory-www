<template>
    <div :class="$style.main">
        <site-nav />
        <nuxt :class="$style.page" />
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

<style module lang="postcss">
.main {
    display: grid;
    width: 100vw;
    height: 100vh;
}

.page {
    height: 100vh;
    padding: 15vh 2rem 24vh;

    @screen md {
        padding: 10vh 11vw 20vh;
    }

    @screen xl {
        padding: 10vh 11vw 20vh;
    }
}
</style>
