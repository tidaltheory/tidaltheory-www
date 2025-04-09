<script>
import { FOCUS_OUTLINE } from '$lib/classnames'
import FBadge from '$lib/components/f-badge.svelte'
import Heading from '$lib/components/heading.svelte'
import PortableText from '$lib/components/portable-text.svelte'

export let work

$: ({ startDateNice, endDateNice, title, lede, slug, discipline, content } =
	work)

let isPublished
$: isPublished = Boolean(lede) && Boolean(content)
</script>

<article class="relative grid items-start gap-6">
	<header class="relative grid gap-4" class:opacity-60={!isPublished}>
		<time><time>{startDateNice}</time> – <time>{endDateNice}</time></time>
		<Heading level={4}>{title}</Heading>
	</header>
	<div
		class="flex flex-wrap items-start gap-2 lg:order-3"
		class:opacity-60={!isPublished}
	>
		{#each discipline as text}
			<FBadge>{text}</FBadge>
		{/each}
	</div>
	<div class="prose lg:order-2 lg:col-span-2">
		{#if lede && content}
			<PortableText value={lede} />
		{/if}
		<p>
			{#if content}
				<a
					class="underline decoration-[transparent] decoration-[0.0781em] underline-offset-[calc(0.0781em_*_2)] {FOCUS_OUTLINE}"
					href="/work/{slug.current}/"
					><span aria-hidden="true">↳</span> Read more</a
				>
			{:else}
				<var class="opacity-60">Case study coming soon.</var>
			{/if}
		</p>
	</div>
</article>

<style>
article {
	--block-gap: 4.5rem;
	--bullet-size: 0.375rem;
	--bullet-offset: 0.5rem;
	--line-offset: 2px;

	&:not(:last-of-type)::before {
		position: absolute;
		inset-block-start: calc(var(--bullet-size) + 1.5rem);
		inset-inline-end: calc(100% + var(--bullet-offset) + var(--line-offset));
		block-size: calc(100% + var(--block-gap) - 2.75rem);
		inline-size: 2px;
		content: '';
		background-color: theme('colors.grey.600');
	}

	@media (min-width: 768px) {
		--block-gap: 7rem;
		--bullet-size: 0.5rem;
		--bullet-offset: 1rem;
		--line-offset: 3px;
	}

	@container section (width) {
		--outer-col: minmax(min-content, calc(22.2222cqi - 24px));
		--inner-col: calc(16.6667cqi - 12px);

		@media (min-width: 1024px) {
			grid-template-columns:
				var(--outer-col) var(--inner-col) var(--inner-col)
				var(--outer-col);
		}
	}

	&:has(a[href]):hover time::before,
	&:has(a[href]):focus-within time::before {
		background-color: #fff;
		box-shadow:
			0 0 calc(var(--bullet-size) * 0.08) 0 #fff,
			0 0 calc(var(--bullet-size) * 0.32) calc(var(--bullet-size) * 0.08) #fff,
			0 0 calc(var(--bullet-size) * 1.28) calc(var(--bullet-size) * 0.32) #fff;
		transition-duration: 300ms;
		transition-timing-function: ease-out;
	}
}

/**
 * 1. Positions the ::before pseudo-element centered to the text.
 * 2. Approximates a whitespace removed by the flex display.
 */
time:has(time) {
	--font-size-px: 12;
	--line-height-offset: calc(
		(((var(--line-height-scale) * var(--font-size-px)) - 16) / 2) /
			var(--font-size-px)
	);

	display: flex;
	align-items: center; /* [1] */
	gap: 0.5ch; /* [2] */
	color: rgb(192 200 205 / 1);
	font-size: 0.75rem;
	line-height: 1rem;

	@media (min-width: 768px) {
		--font-size-px: 14;
		--line-height-offset: calc(
			(((var(--line-height-scale) * var(--font-size-px)) - 20) / 2) /
				var(--font-size-px)
		);

		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	&::before {
		position: absolute;
		inset-inline-end: calc(100% + var(--bullet-offset));
		inline-size: var(--bullet-size);
		block-size: var(--bullet-size);
		content: '';
		border-radius: 999px;
		background-color: theme('colors.grey.400');
		transition: 150ms ease-in;
		transition-property: background-color, box-shadow;
	}
}

p:not(:first-child) {
	margin-top: 1lh;
}

a::before {
	position: absolute;
	inset: -1rem;
	content: '';
}
</style>
