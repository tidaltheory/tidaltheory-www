<script>
import Heading from '~/components/Heading.vue'
import Text from '~/components/Text.vue'
export default {
    components: {
        Heading,
        TextContent: Text,
    },
}
</script>

<template>
    <div class="grid grid-cols-2">
        <div
            class="
                z-10
                flex flex-col
                justify-between
                row-start-1
                col-start-1 col-span-2
                h-full
                pr-20
            "
        >
            <Heading>Tidal<br />Theory</Heading>
            <TextContent element="p"
                >User Interface Developer,<br />currently working at
                Showbie.</TextContent
            >
        </div>
        <div
            :class="$style.hero"
            class="
                row-start-1
                col-start-1 col-span-2
                xl:col-start-2 xl:col-span-1
                pb-[6vh]
                pl-[14vw]
                md:pb-[19vh] md:pl-[22vw]
                xl:pb-0 xl:pl-20
            "
        >
            <div class="w-full h-full bg-grey-700" />
        </div>
    </div>
</template>

<style module lang="postcss">
/* .hero {
    grid-row: 1;
    grid-column: span 2 / span 2;
    grid-column-start: 1;

    @screen xl {
        grid-column: auto;
        grid-column-start: 2;
    }
} */
</style>
