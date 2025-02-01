<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import SiteNavLogo from './site-nav-logo.svelte'
import Tooltip from './tooltip.svelte'

export let home = false
/** @type {string} */
export let href
/** @type {string | undefined} */
export let label = undefined
</script>

<Tooltip {label} let:tooltipReference let:toggleTooltip>
	<a
		data-sveltekit-prefetch
		{href}
		class="rounded {FOCUS_OUTLINE} {home ? 'text-cyan-400' : ''}"
		use:tooltipReference
		on:mouseover={!$$slots.default && toggleTooltip}
		on:focus={!$$slots.default && toggleTooltip}
		on:mouseout={!$$slots.default && toggleTooltip}
		on:blur={!$$slots.default && toggleTooltip}
	>
		<div class="pointer-events-none flex items-center">
			{#if home}
				<SiteNavLogo />
			{:else}
				<div class="bg-grey-600 h-8 w-8 rounded" />
			{/if}
			{#if $$slots.default}
				<span
					class="font-display leading-trim px-2 text-base font-bold uppercase leading-none tracking-wider"
				>
					<slot />
				</span>
			{/if}
		</div>
	</a>
</Tooltip>
