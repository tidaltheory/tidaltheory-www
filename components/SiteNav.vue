<script>
import NavItem from '~/components/NavItem.vue'
import Stack from '~/components/Stack'
export default {
    components: {
        NavItem,
        Stack,
    },
    data() {
        return {
            isMenuOpen: false,
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
    },
}
</script>

<template>
    <div class="fixed top-0 z-50 w-screen md:w-auto">
        <div
            class="relative z-10 h-16 md:h-screen px-8 py-4 md:p-6 bg-grey-900"
        >
            <div class="md:absolute flex justify-between">
                <div class="flex">
                    <NuxtLink to="/">
                        <div class="w-8 h-8 rounded bg-cyan-600" />
                    </NuxtLink>
                </div>
                <div class="flex md:hidden">
                    <button
                        class="p-0 border-none rounded bg-transparent"
                        @click="toggleMenu"
                    >
                        <div class="w-16 h-8 rounded bg-grey-600" />
                    </button>
                </div>
            </div>

            <div class="flex h-full place-items-center">
                <nav class="hidden md:block">
                    <Stack>
                        <NavItem to="work" />
                        <NavItem to="projects" />
                        <NavItem to="photos" />
                        <NavItem to="about" />
                    </Stack>
                </nav>
            </div>
        </div>
        <Transition
            enter-class="transform -translate-y-full"
            enter-active-class="transition duration-200 ease-out"
            leave-active-class="transition duration-300 ease-in"
            leave-to-class="-translate-y-full"
        >
            <div
                v-if="isMenuOpen"
                class="
                    absolute
                    left-0
                    flex
                    justify-end
                    gap-4
                    w-full
                    px-8
                    py-4
                    pb-8
                    bg-grey-900 bg-opacity-70
                    firefox:bg-opacity-90
                    backdrop-blur
                "
            >
                <Stack>
                    <NavItem to="work">Work</NavItem>
                    <NavItem to="projects">Projects</NavItem>
                    <NavItem to="photos">Photos</NavItem>
                    <NavItem to="about">About</NavItem>
                </Stack>
            </div>
        </Transition>
    </div>
</template>
