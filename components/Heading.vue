<script>
const resolveHeadingElement = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
}

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

<template>
    <component
        :is="heading"
        class="
            font-display
            text-5xl
            md:text-7xl
            xl:text-8xl
            font-bold
            leading-none leading-trim
            text-white
            uppercase
        "
    >
        <slot />
    </component>
</template>
