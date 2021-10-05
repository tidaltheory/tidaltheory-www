<script>
export default {
    props: {
        element: {
            type: String,
            default: 'span',
        },
    },
}
</script>

<template>
    <component
        :is="element"
        class="font-sans text-6 leading-normal leading-trim text-white"
    >
        <slot />
    </component>
</template>
