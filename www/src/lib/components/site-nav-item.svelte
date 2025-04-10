<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

/**
 * @typedef {Object} Props
 * @property {string} href
 * @property {boolean} [main]
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let { href, main = false, children } = $props()

const mainClasses = 'font-display font-bold uppercase tracking-wider'
</script>

<a
	data-sveltekit-prefetch
	{href}
	class="rounded p-2 text-white {FOCUS_OUTLINE}"
>
	<div class="pointer-events-none flex items-center">
		{#if children}
			<span
				class="leading-trim text-base leading-none {main
					? mainClasses
					: 'font-semibold tracking-tight'}"
			>
				{@render children?.()}
			</span>
		{/if}
	</div>
</a>

<style>
a {
	position: relative;

	&::after {
		position: absolute;
		inset: 0;
		background-color: currentColor;
		content: '';
		scale: 0 1;
	}

	&:hover {
		&::after {
			animation:
				redact 300ms ease-in-out 2 alternate,
				origin 300ms step-end forwards;
			transform-origin: 0% 50%;
		}
	}
}

@keyframes redact {
	80%,
	100% {
		scale: 1 1;
	}
}

@keyframes origin {
	to {
		transform-origin: 100% 50%;
	}
}
</style>
