<template>
    <div class="grid grid-cols-2">
        <div :class="$style.intro" class="pr-20">
            <Heading>Tidal Theory</Heading>
            <TextContent element="p"
                >User Interface Developer,<br />currently working at
                Showbie.</TextContent
            >
        </div>
        <div
            :class="$style.hero"
            class="pb-[6vh] pl-[14vw] md:pb-[19vh] md:pl-[22vw] xl:pb-0 xl:pl-20"
        >
            <div class="w-full h-full bg-grey-700" />
        </div>
    </div>
</template>

<script lang="ts">
import Heading from '~/components/Heading.vue'
import Text from '~/components/Text.vue'
export default {
    components: {
        Heading,
        TextContent: Text,
    },
}
</script>

<style module lang="postcss">
.intro {
    z-index: theme('zIndex.10');
    display: flex;
    flex-direction: column;
    grid-row: 1;
    grid-column: 1;
    justify-content: space-between;
    height: 100%;
}

.hero {
    grid-row: 1;
    grid-column: span 2 / span 2;
    grid-column-start: 1;

    @screen xl {
        grid-column: auto;
        grid-column-start: 2;
    }
}
</style>
