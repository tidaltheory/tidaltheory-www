<script>
import { beforeNavigate } from '$app/navigation'
import { FOCUS_OUTLINE } from '$lib/classnames'
import { classes } from '$lib/transitions'

import SiteNavItem from './site-nav-item.svelte'

let isMenuOpen = false

function toggleMenu() {
	isMenuOpen = !isMenuOpen
}

beforeNavigate(async () => {
	isMenuOpen = false
})
</script>

<div class="fixed top-0 z-50 w-screen md:w-auto">
	<div class="relative z-10 h-16 bg-grey-900 px-8 py-4 md:h-screen md:p-6">
		<div
			class="flex justify-between md:absolute md:top-[calc(11vh_+_1.5rem)]"
		>
			<div class="flex">
				<SiteNavItem href="/" home label="Home" />
			</div>
			<div class="flex md:hidden">
				<button
					class="bg-transparent rounded border-none p-0 {FOCUS_OUTLINE}"
					on:click={toggleMenu}
				>
					<div class="h-8 w-16 rounded bg-grey-600" />
				</button>
			</div>
		</div>

		<div class="flex h-full place-items-center">
			<nav class="hidden md:block">
				<div class="grid gap-8">
					<SiteNavItem href="/about/" label="About" />
					<SiteNavItem href="/projects/" label="Projects" />
					<SiteNavItem href="/photos/" label="Photos" />
					<SiteNavItem href="/writing/" label="Writing" />
					<SiteNavItem href="/notes/" label="Notes" />
				</div>
			</nav>
		</div>
	</div>
	{#if isMenuOpen}
		<div
			class="fixed h-screen w-screen"
			role="button"
			tabindex="-1"
			on:click={toggleMenu}
			on:keypress={toggleMenu}
		/>
	{/if}
	{#if isMenuOpen}
		<div
			class="absolute left-0 flex w-full justify-end gap-4 bg-grey-900 bg-opacity-70 px-8 py-4 pb-8 backdrop-blur transition"
			in:classes={{
				duration: 200,
				base: 'duration-200 ease-out',
				from: '-translate-y-full',
			}}
			out:classes={{
				duration: 150,
				base: 'duration-150 ease-in',
				to: '-translate-y-full',
			}}
		>
			<div class="grid gap-8">
				<SiteNavItem href="/about/">About</SiteNavItem>
				<SiteNavItem href="/projects/">Projects</SiteNavItem>
				<SiteNavItem href="/photos/">Photos</SiteNavItem>
				<SiteNavItem href="/writing/">Writing</SiteNavItem>
				<SiteNavItem href="/notes/">Notes</SiteNavItem>
			</div>
		</div>
	{/if}
</div>
