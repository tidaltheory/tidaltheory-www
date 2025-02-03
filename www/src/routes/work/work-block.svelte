<script>
import FBadge from '$lib/components/f-badge.svelte'
import Heading from '$lib/components/heading.svelte'
import PortableText from '$lib/components/portable-text.svelte'

export let work

$: ({ startDateNice, endDateNice, title, lede, slug, discipline, content } =
	work)
</script>

<article class="relative grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
	<header class="relative grid gap-4">
		<time><time>{startDateNice}</time> – <time>{endDateNice}</time></time>
		<Heading level={4}>{title}</Heading>
	</header>
	<div class="flex flex-wrap items-start gap-2 lg:order-3">
		{#each discipline as text}
			<FBadge>{text}</FBadge>
		{/each}
	</div>
	<div class="prose lg:order-2">
		{#if lede}
			<PortableText value={lede} />
		{/if}
		<p>
			{#if content}
				<a href="/work/{slug.current}/"><span aria-hidden>↳</span> Read more</a>
			{:else}
				Case study coming soon.
			{/if}
		</p>
	</div>
</article>

<style>
article {
	--block-gap: 4.5rem;
	--bullet-size: 0.375rem;
	--bullet-offset: 0.5rem;

	&:not(:last-of-type)::before {
		position: absolute;
		inset-block-start: calc(var(--bullet-size) + 1.5rem);
		inset-inline-start: calc(calc(var(--bullet-offset) + 1px) * -1);
		block-size: calc(100% + var(--block-gap) - 2.75rem);
		inline-size: 2px;
		content: '';
		background-color: theme('colors.grey.600');
	}

	@media (min-width: 768px) {
		--block-gap: 7rem;
		--bullet-size: 0.5rem;
		--bullet-offset: 1rem;
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
		inset-inline-start: calc(
			calc(var(--bullet-offset) + calc(var(--bullet-size) / 2)) * -1
		);
		inline-size: var(--bullet-size);
		block-size: var(--bullet-size);
		content: '';
		border-radius: 999px;
		background-color: theme('colors.grey.400');
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
