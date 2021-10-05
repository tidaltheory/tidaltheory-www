<script>
import SiteNav from '~/components/SiteNav.vue'
export default {
    components: {
        SiteNav,
    },
}
</script>

<template>
    <div class="grid w-screen h-screen">
        <SiteNav />
        <Nuxt
            class="
                h-screen
                pt-[15vh]
                px-8
                pb-[24vh]
                md:pt-[10vh] md:px-[11vw] md:pb-[20vh]
                xl:pt-[10vh] xl:px-[11vw] xl:pb-[20vh]
            "
        />
    </div>
</template>
