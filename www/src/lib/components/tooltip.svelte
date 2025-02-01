<script>
import { fade, fly } from 'svelte/transition'

import { offset } from '@floating-ui/dom'
import { createFloatingActions } from 'svelte-floating-ui'

/** @type {string | undefined} */
export let label = undefined

let showTooltip = false

function toggleTooltip() {
	showTooltip = !showTooltip
}

const [tooltipReference, tooltipFloating] = createFloatingActions({
	strategy: 'fixed',
	placement: 'right',
	middleware: [offset(12)],
})
</script>

<slot {tooltipReference} {toggleTooltip} />

{#if showTooltip}
	<div
		class="bg-grey-700 rounded-sm px-4 py-4 shadow-lg"
		use:tooltipFloating
		in:fly={{ x: 24 }}
		out:fade={{ duration: 150 }}
	>
		<span
			class="font-display leading-trim relative block text-base uppercase leading-none tracking-wider"
		>
			{label}
		</span>
	</div>
{/if}
