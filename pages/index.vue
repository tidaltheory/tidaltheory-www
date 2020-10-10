<template>
    <div :class="$style.page">
        <div :class="$style.intro">
            <Heading>Tidal Theory</Heading>
            <TextContent element="p"
                >User Interface Developer, currently working at
                Showbie.</TextContent
            >
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

<style module>
.page {
    height: 100vh;
    padding: 10vh 9vw 20vh;
}

.intro {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
</style>
