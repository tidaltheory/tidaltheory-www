<template>
    <component
        :is="heading"
        class="font-display text-h1 font-bold leading-h1 text-white capsize uppercase"
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
