<template>
    <div
        class="fixed top-0 w-screen md:w-auto h-16 md:h-screen px-8 py-4 md:p-6 bg-grey-900"
    >
        <div class="md:absolute flex justify-between">
            <div class="flex">
                <nuxt-link to="/"
                    ><div class="w-8 h-8 rounded bg-cyan-600"></div
                ></nuxt-link>
            </div>
            <div class="flex md:hidden">
                <button class="p-0 border-none rounded bg-transparent"
                    ><div class="w-8 h-8 rounded bg-cyan-600"></div
                ></button>
            </div>
        </div>
        <div class="flex h-full place-items-center">
            <nav class="hidden md:block">
                <Stack>
                    <nuxt-link to="work"
                        ><div class="w-8 h-8 rounded bg-grey-600"></div
                    ></nuxt-link>
                    <nuxt-link to="projects"
                        ><div class="w-8 h-8 rounded bg-grey-600"></div
                    ></nuxt-link>
                    <nuxt-link to="photos"
                        ><div class="w-8 h-8 rounded bg-grey-600"></div
                    ></nuxt-link>
                    <nuxt-link to="about"
                        ><div class="w-8 h-8 rounded bg-grey-600"></div
                    ></nuxt-link>
                </Stack>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import Stack from '~/components/Stack'
export default {
    components: {
        Stack,
    },
}
</script>
