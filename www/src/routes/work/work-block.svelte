<script>
import FBadge from '$lib/components/f-badge.svelte'
import Heading from '$lib/components/heading.svelte'
import PortableText from '$lib/components/portable-text.svelte'

export let work

$: ({ startDateNice, endDateNice, title, lede, slug, discipline, content } =
	work)
</script>

<article class="relative grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
	<header class="grid gap-4">
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
time:has(time) {
	--font-size-px: 12;
	--line-height-offset: calc(
		(((var(--line-height-scale) * var(--font-size-px)) - 16) / 2) /
			var(--font-size-px)
	);

	color: rgb(192 200 205 / 1);
	font-size: 0.75rem /* 12px */;
	line-height: 1rem /* 16px */;

	@media (min-width: 768px) {
		--font-size-px: 14;
		--line-height-offset: calc(
			(((var(--line-height-scale) * var(--font-size-px)) - 20) / 2) /
				var(--font-size-px)
		);

		font-size: 0.875rem /* 14px */;
		line-height: 1.25rem /* 20px */;
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
