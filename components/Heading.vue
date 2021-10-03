<template>
    <component
        :is="heading"
        class="
            font-display
            text-12
            md:text-20
            xl:text-24
            font-bold
            leading-none
            text-white
            leading-trim
            uppercase
        "
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
