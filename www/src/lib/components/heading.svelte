<script>
import { onMount } from 'svelte'

import { unwrapLines, wrapLines } from '$lib/wrap-lines'

const resolveHeadingElement = {
	0: 'h1',
	1: 'h1',
	2: 'h2',
	3: 'h3',
	4: 'h4',
}
const headingStyle = {
	0: 'text-5xl md:text-7xl xl:text-8xl',
	1: 'text-4xl md:text-6xl xl:text-7xl',
	2: 'text-3xl md:text-5xl xl:text-6xl',
	3: 'text-2xl md:text-4xl xl:text-5xl',
	4: 'text-xl md:text-3xl xl:text-4xl',
}

/** @type {keyof typeof resolveHeadingElement} */
export let level = 1
/** @type {boolean | undefined} */
export let shouldShow
export let transitionIn = false

const heading = resolveHeadingElement[level]
const styleClass = headingStyle[level]

$: hasWrapped = false
$: show = shouldShow !== undefined && hasWrapped ? shouldShow : true

/** @type {Element} */
let element
onMount(() => {
	if (transitionIn) wrapLines(element)

	const resizeObserver = new ResizeObserver((entries) => {
		const entry = entries.at(0)

		if (entry && transitionIn) {
			if (hasWrapped) unwrapLines(entry.target)
			wrapLines(entry.target)
		}
	})

	resizeObserver.observe(element)
	hasWrapped = true

	return () => resizeObserver.unobserve(element)
})
</script>

<svelte:element
	this={heading}
	class="font-bold uppercase font-display leading-none leading-trim {styleClass} text-white empty:hidden"
	class:line-hidden={!show}
>
	<span class="line inline-block will-change-transform" bind:this={element}>
		<slot />
	</span>
</svelte:element>

<style>
:global(.line) {
	transition:
		opacity 0.7s cubic-bezier(0.165, 0.84, 0.44, 1),
		transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
	transition-delay: var(--delay, 0);
}

.line-hidden {
	opacity: 0;
}

.line-hidden :global(.line) {
	opacity: 0;
	transform: rotateX(75deg) rotateY(10deg) rotateZ(-9deg);
}
</style>
