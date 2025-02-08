<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import SiteNavLogo from './site-nav-logo.svelte'

/**
 * @typedef {Object} Props
 * @property {string} href
 * @property {import('svelte').Snippet} [children]
 * @property {boolean} [home]
 */

/** @type {Props} */
let { home = false, href, children } = $props()
</script>

<a
	data-sveltekit-prefetch
	{href}
	class="rounded {FOCUS_OUTLINE} {home ? 'text-cyan-400' : ''}"
>
	<div class="pointer-events-none flex items-center">
		{#if home}
			<SiteNavLogo />
		{:else}
			<div class="bg-grey-600 h-8 w-8 rounded"></div>
		{/if}
		{#if children}
			<span
				class="font-display leading-trim px-2 text-base font-bold uppercase leading-none tracking-wider"
			>
				{@render children?.()}
			</span>
		{/if}
	</div>
</a>
