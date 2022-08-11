<script lang="ts">
const resolveHeadingElement = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
	4: 'h4',
}
const headingStyle = {
	title: 'text-5xl md:text-7xl xl:text-8xl text-white',
	subtitle: 'text-2xl md:text-4xl xl:text-5xl text-grey-400',
}

export let shouldShow = undefined
export let level: keyof typeof resolveHeadingElement = 1
export let subtitle = false

const heading = resolveHeadingElement[level]
const styleClass = subtitle ? headingStyle.subtitle : headingStyle.title

let show: boolean
$: show = shouldShow !== undefined ? shouldShow : true
</script>

<svelte:element
	this={heading}
	class="font-bold uppercase font-display leading-none leading-trim {styleClass}"
>
	<span
		class="chunk inline-block will-change-transform"
		class:twist={!show}
		class:opacity-0={!show}
	>
		<slot />
	</span>
</svelte:element>

<style>
.chunk {
	transition: opacity 0.7s cubic-bezier(0.165, 0.84, 0.44, 1),
		transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
	transition-delay: var(--delay, 0);
}
</style>
