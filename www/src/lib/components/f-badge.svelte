<script>
/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { children } = $props()
</script>

<div
	class="bg-grey-700 flex rounded px-[0.375rem] py-1 lg:px-2 lg:py-[0.375rem]"
>
	<span
		class="leading-trim salt text-grey-200 block text-nowrap text-xs uppercase lg:text-sm"
	>
		{@render children?.()}
	</span>
</div>
