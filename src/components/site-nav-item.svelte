<script>
export let href
</script>

<a sveltekit:prefetch {href}>
	<div class="flex items-center">
		<div class="w-8 h-8 rounded bg-grey-600" />
		{#if $$slots.default}
			<span
				class="px-2 font-display text-base font-bold leading-none leading-trim uppercase"
			>
				<slot />
			</span>
		{/if}
	</div>
</a>
