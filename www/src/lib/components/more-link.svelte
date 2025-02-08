<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

/**
 * @typedef {Object} Props
 * @property {string} [href]
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { href = '/', children } = $props()
</script>

<a {href} class="inline-flex rounded-[1px] {FOCUS_OUTLINE} outline-offset-8">
	<span
		class="leading-trim block whitespace-nowrap font-sans text-base font-medium leading-6 md:text-xl md:leading-9"
	>
		{@render children?.()} →
	</span>
</a>
