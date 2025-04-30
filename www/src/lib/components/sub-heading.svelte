<script>
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

/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
 * @property {keyof typeof resolveHeadingElement} [level]
 * @property {boolean} [shouldShow]
 */

/** @type {Props} */
let { shouldShow, level = 1, children } = $props()

const heading = resolveHeadingElement[level]
const styleClass = headingStyle[level]

let show = $derived(shouldShow === undefined ? true : shouldShow)
</script>

<svelte:element
	this={heading}
	class="font-display leading-trim font-bold uppercase leading-none {styleClass} text-grey-400 empty:hidden"
	class:hide={!show}
>
	<span class="text inline-block will-change-transform" style="--delay: 300ms">
		{@render children?.()}
	</span>
</svelte:element>

<style>
.text {
	--duration: 700ms;
	--easing: cubic-bezier(0.165, 0.84, 0.44, 1);

	transition: var(--duration) var(--easing);
	transition-property: opacity, filter, transform;
	transition-delay: var(--delay, 0);
}

.hide .text {
	opacity: 0;
	filter: blur(8px);
	transform: rotateX(75deg) rotateY(10deg) rotateZ(-9deg);
}
</style>
