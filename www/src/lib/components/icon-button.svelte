<script>
import { createBubbler } from 'svelte/legacy'

const bubble = createBubbler()
import { FOCUS_OUTLINE } from '$lib/classnames'
/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props & { [key: string]: any }} */
let { children, ...rest } = $props()
</script>

<button
	class="bg-grey-900 m-0 rounded border-0 bg-opacity-0 p-1 text-white hover:bg-opacity-50 {FOCUS_OUTLINE}"
	type="button"
	onclick={bubble('click')}
	{...rest}
>
	{@render children?.()}
</button>
