<template>
    <component :is="heading" :class="styles.heading[level]">
        <slot />
    </component>
</template>

<script lang="ts">
import * as styles from './Heading.treat'

const resolveHeadingElement = {
    '1': 'h1',
    '2': 'h2',
    '3': 'h3',
    '4': 'h4',
} as const

export default {
    props: {
        level: {
            type: Number,
            default: 1,
        },
    },

    data() {
        return { styles }
    },

    computed: {
        heading() {
            return resolveHeadingElement[this.level]
        },
    },
}
</script>
