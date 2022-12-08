<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

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
		class="rounded {FOCUS_OUTLINE}"
		use:tooltipReference
		on:mouseover={!$$slots.default && toggleTooltip}
		on:focus={!$$slots.default && toggleTooltip}
		on:mouseout={!$$slots.default && toggleTooltip}
		on:blur={!$$slots.default && toggleTooltip}
	>
		<div class="flex items-center">
			<div
				class="h-8 w-8 rounded {home ? 'bg-cyan-600' : 'bg-grey-600'}"
			/>
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
