<template>
    <component
        :is="heading"
        class="font-display text-12 md:text-20 lg:text-24 font-bold leading12 md:leading-20 lg:leading-24 text-white capsize uppercase"
    >
        <slot />
    </component>
</template>

<script lang="ts">
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
    computed: {
        heading() {
            return resolveHeadingElement[this.level]
        },
    },
}
</script>
