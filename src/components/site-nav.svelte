<script>
import { classes } from '$lib/transitions'

import SiteNavItem from './site-nav-item.svelte'

let isMenuOpen = false

function toggleMenu() {
	isMenuOpen = !isMenuOpen
}
</script>

<div class="fixed top-0 z-50 w-screen md:w-auto">
	<div class="relative z-10 h-16 bg-grey-900 px-8 py-4 md:h-screen md:p-6">
		<div class="flex justify-between md:absolute">
			<div class="flex">
				<a href="/">
					<div class="h-8 w-8 rounded bg-cyan-600" />
				</a>
			</div>
			<div class="flex md:hidden">
				<button
					class="bg-transparent rounded border-none p-0"
					on:click={toggleMenu}
				>
					<div class="h-8 w-16 rounded bg-grey-600" />
				</button>
			</div>
		</div>

		<div class="flex h-full place-items-center">
			<nav class="hidden md:block">
				<div class="grid gap-8">
					<SiteNavItem href="/about/" />
					<SiteNavItem href="/projects/" />
					<SiteNavItem href="/photos/" />
					<!-- <SiteNavItem href="/blog/" /> -->
				</div>
			</nav>
		</div>
	</div>
	{#if isMenuOpen}
		<div
			v-show="isMenuOpen"
			class="fixed h-screen w-screen"
			on:click={toggleMenu}
		/>
	{/if}
	{#if isMenuOpen}
		<div
			class="absolute left-0 flex w-full justify-end gap-4 bg-grey-900 bg-opacity-70 px-8 py-4 pb-8 backdrop-blur transition firefox:bg-opacity-90"
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
				<SiteNavItem href="/about/">About</SiteNavItem>
				<SiteNavItem href="/projects/">Projects</SiteNavItem>
				<SiteNavItem href="/photos/">Photos</SiteNavItem>
				<!-- <SiteNavItem href="/blog/">Blog</SiteNavItem> -->
			</div>
		</div>
	{/if}
</div>
