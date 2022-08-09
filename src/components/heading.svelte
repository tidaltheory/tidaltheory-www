<script lang="ts">
	const resolveHeadingElement = {
		1: 'h1',
		2: 'h2',
		3: 'h3',
		4: 'h4',
	}

	export let level: keyof typeof resolveHeadingElement = 1

	const heading = resolveHeadingElement[level]
</script>

<svelte:element
	this={heading}
	class="font-display text-5xl md:text-7xl xl:text-8xl font-bold leading-none leading-trim text-white uppercase"
>
	<slot />
</svelte:element>
