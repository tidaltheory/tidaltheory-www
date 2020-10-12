<template>
    <div class="grid grid-cols-2" :class="$style.page">
        <div :class="$style.intro" class="pr-20">
            <Heading>Tidal Theory</Heading>
            <TextContent element="p"
                >User Interface Developer,<br />currently working at
                Showbie.</TextContent
            >
        </div>
        <div :class="$style.hero">
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
    padding-bottom: 6vh;
    padding-left: 14vw;

    @screen md {
        padding-bottom: 19vh;
        padding-left: 22vw;
    }

    @screen xl {
        grid-column: auto;
        grid-column-start: 2;
        padding-bottom: 0;
        padding-left: theme('space.20');
    }
}
</style>
