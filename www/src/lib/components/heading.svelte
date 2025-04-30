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

/**
 * @typedef {Object} Props
 * @property {keyof typeof resolveHeadingElement} [level]
 * @property {boolean | undefined} [shouldShow]
 * @property {boolean} [transitionIn]
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let {
	level = 1,
	shouldShow = undefined,
	transitionIn = false,
	children,
} = $props()

const heading = resolveHeadingElement[level]
const styleClass = headingStyle[level]

let hasWrapped = $state(false)

let show = $derived(shouldShow !== undefined && hasWrapped ? shouldShow : true)

/** @type {Element} */
let element = $state()
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
	class="heading font-display leading-trim text-balance font-bold uppercase leading-none {styleClass} m-0 text-white empty:hidden"
	style:opacity={show ? 1 : 0}
>
	<span bind:this={element}>
		{@render children?.()}
	</span>
</svelte:element>

<style>
.heading {
	opacity: 0;

	&:has(:global(.line)) {
		opacity: 1;
	}
}

:global(.line) {
	--duration: 700ms;
	--easing: cubic-bezier(0.165, 0.84, 0.44, 1);
	--distance: 0.125em;
	--distance-y: 0.0625em;
	--rotation: rotateX(75deg) rotateY(10deg) rotateZ(-9deg);

	position: relative;
	transition: var(--duration) var(--easing);
	transition-property: opacity, filter, transform, translate;
	transition-delay: var(--delay, 0);
	color: #1061ff;

	&::before,
	&::after {
		position: absolute;
		inset-inline-start: 0;
		/* z-index: -1; */
		content: attr(data-text);
		mix-blend-mode: plus-lighter;
		pointer-events: none;
		user-select: none;
		transition: var(--duration) var(--easing);
		transition-property: opacity, filter, transform, translate;

		@starting-style {
			opacity: 0;
			filter: blur(8px);
			/* translate: var(--distance); */
		}
	}

	&::before {
		color: #14c7ff;
		transition-delay: calc(var(--delay, 0));
		@starting-style {
			transform: var(--rotation);
			/* translate: calc(var(--distance) * -2) calc(var(--distance-y) * 2); */
		}
	}

	&::after {
		color: #ff6231;
		transition-delay: calc(var(--delay, 0));
		@starting-style {
			transform: var(--rotation);
			/* translate: calc(var(--distance) * -3) calc(var(--distance-y) * 3); */
		}
	}

	@starting-style {
		opacity: 0;
		filter: blur(8px);
		transform: var(--rotation);
		/* translate: calc(var(--distance) * -1) var(--distance-y); */
	}
}
</style>
