<script>
import '../tailwind.css'
import '../prism.css'

import ObserveIntersection from 'svelte-intersection-observer'

import SiteNav from '$lib/components/site-nav.svelte'

/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { children } = $props()

/** @type {HTMLElement} */
let bg = $state()
</script>

<div class="relative grid min-h-[100svh]">
	<ObserveIntersection once element={bg}>
		{#snippet children({ intersecting })}
			<div
				class="bg pointer-events-none absolute inset-0 z-10"
				class:opacity-0={!intersecting}
				bind:this={bg}
			></div>
		{/snippet}
	</ObserveIntersection>
	<SiteNav />
	<main class="mt-16 md:ml-20 md:mt-0">{@render children?.()}</main>
</div>

<style>
.bg {
	background-image: url('/bg.jpg');
	background-image: url('/bg.webp');
	background-position: top center;
	background-repeat: no-repeat;
	mix-blend-mode: plus-lighter;
	transition: opacity 1500ms ease-in;

	@screen md {
		background-image: url('/bg-md.jpg');
		background-image: url('/bg-md.webp');
		background-position: top right;
	}

	@screen xl {
		background-image: url('/bg-xl.jpg');
		background-image: url('/bg-xl.webp');
	}
}
</style>
