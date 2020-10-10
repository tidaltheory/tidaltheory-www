<template>
    <nav class="fixed h-screen p-6 bg-grey-900">
        <Stack>
            <nuxt-link to="work"
                ><div class="w-8 h-8 bg-grey-600"></div
            ></nuxt-link>
            <nuxt-link to="projects"
                ><div class="w-8 h-8 bg-grey-600"></div
            ></nuxt-link>
            <nuxt-link to="photos"
                ><div class="w-8 h-8 bg-grey-600"></div
            ></nuxt-link>
            <nuxt-link to="about"
                ><div class="w-8 h-8 bg-grey-600"></div
            ></nuxt-link>
        </Stack>
    </nav>
</template>

<script lang="ts">
import Stack from '~/components/Stack'
export default {
    components: {
        Stack,
    },
}
</script>
