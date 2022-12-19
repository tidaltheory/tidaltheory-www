<script lang="ts">
const resolveHeadingElement = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
	4: 'h4',
}
const headingStyle = {
	1: 'text-4xl md:text-6xl xl:text-7xl',
	2: 'text-3xl md:text-5xl xl:text-6xl',
	3: 'text-2xl md:text-4xl xl:text-5xl',
	4: 'text-xl md:text-3xl xl:text-4xl',
}

export let shouldShow: boolean | undefined
export let level: keyof typeof resolveHeadingElement = 1

const heading = resolveHeadingElement[level]
const styleClass = headingStyle[level]

$: show = shouldShow === undefined ? true : shouldShow
</script>

<svelte:element
	this={heading}
	class="font-bold uppercase font-display leading-none leading-trim {styleClass} text-grey-400 empty:hidden"
	class:hide={!show}
>
	<span
		class="text inline-block will-change-transform"
		style="--delay: 300ms"
	>
		<slot />
	</span>
</svelte:element>

<style>
.text {
	transition: opacity 0.7s cubic-bezier(0.165, 0.84, 0.44, 1),
		transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
	transition-delay: var(--delay, 0);
}

.hide .text {
	opacity: 0;
	transform: rotateX(75deg) rotateY(10deg) rotateZ(-9deg);
}
</style>
