<script>
/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { children } = $props()
</script>

<div
	class="prose text-grey-100 leading-trim salt text-pretty text-lg md:text-xl"
>
	{@render children?.()}
</div>
