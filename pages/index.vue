<template>
    <div :class="$style.page">
        <div :class="$style.intro">
            <Heading>Tidal Theory</Heading>
            <p>User Interface Developer, currently working at Showbie.</p>
        </div>
    </div>
</template>

<script lang="ts">
import Heading from '~/components/Heading.vue'
export default {
    components: {
        Heading,
    },
    data() {
        return {
            // tailwindConfig,
            tailwindConfig: 'moo',
        }
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
