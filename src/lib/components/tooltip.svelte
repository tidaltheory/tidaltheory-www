<script>
import { fade, fly } from 'svelte/transition'

import { offset } from '@floating-ui/dom'
import { createFloatingActions } from 'svelte-floating-ui'

/** @type {string} */
export let label

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
		class="rounded-sm bg-grey-700 px-4 py-4 shadow-lg"
		use:tooltipFloating
		in:fly={{ x: 24 }}
		out:fade={{ duration: 150 }}
	>
		<span
			class="relative block uppercase tracking-wider font-display text-base leading-none leading-trim"
		>
			{label}
		</span>
	</div>
{/if}
