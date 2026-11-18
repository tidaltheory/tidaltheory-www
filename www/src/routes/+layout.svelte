<script>
import '../tailwind.css'
import '../prism.css'

import PlanetRings from '$lib/components/planet-rings.svelte'
import SiteNav from '$lib/components/site-nav.svelte'

/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { children } = $props()
</script>

<div class="relative grid min-h-[100svh]">
	<PlanetRings />
	<SiteNav />
	<main class="mt-16 md:ml-20 md:mt-0">{@render children?.()}</main>
</div>
