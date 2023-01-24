<script>
export let vertical
</script>

<div class="relative">
	<div
		class="absolute bg-grey-700 {vertical ? 'h-full w-px' : 'h-px w-full'}"
		role="separator"
		aria-orientation={vertical ? 'vertical' : 'horizontal'}
	/>
</div>
