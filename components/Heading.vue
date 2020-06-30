<template>
    <component :is="heading">
        <slot />
    </component>
</template>

<script lang="ts">
export default {
    props: {
        level: {
            type: Number,
            default: 1,
        },
    },

    computed: {
        heading() {
            return `h${this.level}`
        },
    },
}
</script>
