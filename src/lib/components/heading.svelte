<script lang="ts">
import { onMount } from 'svelte'

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
	class="font-bold uppercase font-display leading-none leading-trim {styleClass}"
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
