<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

export let href
</script>

<a sveltekit:prefetch {href} class="rounded {FOCUS_OUTLINE}">
	<div class="flex items-center">
		<div class="h-8 w-8 rounded bg-grey-600" />
		{#if $$slots.default}
			<span
				class="px-2 font-bold uppercase font-display text-base leading-none leading-trim"
			>
				<slot />
			</span>
		{/if}
	</div>
</a>
