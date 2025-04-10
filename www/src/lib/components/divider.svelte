<script>
/**
 * @typedef {Object} Props
 * @property {boolean} [vertical]
 */

/** @type {Props} */
let { vertical = false } = $props()
</script>

<div class="relative">
	<div
		class="bg-grey-800 absolute mix-blend-screen {vertical
			? 'h-full w-px'
			: 'h-px w-full'}"
		role="separator"
		aria-orientation={vertical ? 'vertical' : 'horizontal'}
	></div>
</div>
