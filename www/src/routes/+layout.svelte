<script>
import '../tailwind.css'
import '../prism.css'
import ObserveIntersection from 'svelte-intersection-observer'

import SiteNav from '$lib/components/site-nav.svelte'

/** @type {HTMLElement} */
let bg
</script>

<div class="relative grid min-h-[100svh]">
	<ObserveIntersection once element={bg} let:intersecting>
		<div
			class="bg absolute inset-0 -z-[1]"
			class:opacity-0={!intersecting}
			bind:this={bg}
		/>
	</ObserveIntersection>
	<SiteNav />
	<main class="mt-16 md:mt-0 md:ml-20"><slot /></main>
</div>

<style>
.bg {
	background-image: url('/bg.jpg');
	background-image: url('/bg.webp');
	background-position: top center;
	background-repeat: no-repeat;
	mix-blend-mode: screen;
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
