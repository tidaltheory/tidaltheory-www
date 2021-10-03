<script>
export default {
    props: {
        to: {
            type: String,
        },
    },
}
</script>

<template>
    <NuxtLink :to="to">
        <div class="flex items-center">
            <div class="w-8 h-8 rounded bg-grey-600" />
            <span
                class="
                    px-2
                    font-display
                    text-4
                    font-bold
                    leading-none leading-trim
                    uppercase
                "
            >
                <slot />
            </span>
        </div>
    </NuxtLink>
</template>
