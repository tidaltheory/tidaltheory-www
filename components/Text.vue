<template>
    <component
        :is="element"
        class="font-sans text-6 leading-normal text-white capsize"
    >
        <slot />
    </component>
</template>

<script lang="ts">
export default {
    props: {
        element: {
            type: String,
            default: 'span',
        },
    },
}
</script>
