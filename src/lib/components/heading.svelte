<script lang="ts">
import { onMount } from 'svelte'

const resolveHeadingElement = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
	4: 'h4',
}
const headingStyle = {
	1: 'text-5xl md:text-7xl xl:text-8xl',
	2: 'text-4xl md:text-6xl xl:text-7xl',
	3: 'text-3xl md:text-5xl xl:text-5xl',
	4: 'text-2xl md:text-3xl xl:text-3xl',
}

export let shouldShow = undefined
export let level: keyof typeof resolveHeadingElement = 1
export let subtitle = false

const heading = resolveHeadingElement[level]
const styleClass = headingStyle[level]
const colorClass = subtitle ? 'text-grey-400' : 'text-white'

let hasWrapped = false
let show: boolean
$: show = shouldShow !== undefined && hasWrapped ? shouldShow : true

/**
 * Wrap each line of the heading in a `span` in order to stagger the reveal
 * transition styles
 *
 * @todo Find a way to wrap each line without relying on `br` tags.
 */
function wrapLines(element: HTMLHeadingElement) {
	let childNodes = element.childNodes

	childNodes.forEach((node, index) => {
		if (node.nodeType === 3) {
			let line = document.createElement('span')
			line.textContent = node.nodeValue
			line.classList.add('line', 'inline-block', 'will-change-transform')
			line.setAttribute('style', `--delay: ${50 * index}ms`)

			element.insertBefore(line, node)
			element.removeChild(node)
		}
	})

	hasWrapped = true
}

let element: HTMLHeadingElement
onMount(() => wrapLines(element))
</script>

<svelte:element
	this={heading}
	bind:this={element}
	class="font-bold uppercase font-display leading-none leading-trim {styleClass} {colorClass}"
	class:line-hidden={!show}
>
	<slot />
</svelte:element>

<style>
:global(.line) {
	transition: opacity 0.7s cubic-bezier(0.165, 0.84, 0.44, 1),
		transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
	transition-delay: var(--delay, 0);
}

.line-hidden :global(.line) {
	opacity: 0;
	transform: rotateX(75deg) rotateY(10deg) rotateZ(-9deg);
}
</style>
