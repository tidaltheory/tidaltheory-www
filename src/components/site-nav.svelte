<script>
import { classes } from '$lib/transitions'

import SiteNavItem from './site-nav-item.svelte'

let isMenuOpen = false

function toggleMenu() {
	isMenuOpen = !isMenuOpen
}
</script>

<div class="fixed top-0 z-50 w-screen md:w-auto">
	<div class="relative z-10 h-16 md:h-screen px-8 py-4 md:p-6 bg-grey-900">
		<div class="md:absolute flex justify-between">
			<div class="flex">
				<a href="/">
					<div class="w-8 h-8 rounded bg-cyan-600" />
				</a>
			</div>
			<div class="flex md:hidden">
				<button
					class="p-0 border-none rounded bg-transparent"
					on:click={toggleMenu}
				>
					<div class="w-16 h-8 rounded bg-grey-600" />
				</button>
			</div>
		</div>

		<div class="flex h-full place-items-center">
			<nav class="hidden md:block">
				<div class="grid gap-8">
					<SiteNavItem href="/work/" />
					<SiteNavItem href="/projects/" />
					<SiteNavItem href="/photos/" />
					<SiteNavItem href="/about/" />
				</div>
			</nav>
		</div>
	</div>
	{#if isMenuOpen}
		<div
			v-show="isMenuOpen"
			class="fixed w-screen h-screen"
			on:click={toggleMenu}
		/>
	{/if}
	{#if isMenuOpen}
		<div
			class="absolute left-0 flex justify-end transition gap-4 w-full px-8 py-4 pb-8 bg-grey-900 bg-opacity-70 firefox:bg-opacity-90 backdrop-blur"
			in:classes={{
				duration: 200,
				base: 'duration-200 ease-out',
				from: '-translate-y-full',
			}}
			out:classes={{
				duration: 300,
				base: 'duration-300 ease-in',
				to: '-translate-y-full',
			}}
		>
			<div class="grid gap-8">
				<SiteNavItem href="/work/">Work</SiteNavItem>
				<SiteNavItem href="/projects/">Projects</SiteNavItem>
				<SiteNavItem href="/photos/">Photos</SiteNavItem>
				<SiteNavItem href="/about/">About</SiteNavItem>
			</div>
		</div>
	{/if}
</div>
