<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import SiteNavLogo from './site-nav-logo.svelte'
import Tooltip from './tooltip.svelte'

export let home = false
/** @type {string} */
export let href
/** @type {string} */
export let label
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
				<div class="h-8 w-8 rounded bg-grey-600" />
			{/if}
			{#if $$slots.default}
				<span
					class="px-2 font-bold uppercase tracking-wider font-display text-base leading-none leading-trim"
				>
					<slot />
				</span>
			{/if}
		</div>
	</a>
</Tooltip>
