<script>
import FBadge from '$lib/components/f-badge.svelte'
import FadeUp from '$lib/components/helpers/fade-up.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'
import TextLede from '$lib/components/text-lede.svelte'

/** @type {import('./[slug]/$types').PageData} */
export let data

$: ({
	title,
	shortLede,
	lede,
	startDateNice,
	endDateNice,
	discipline,
	content,
} = data)
</script>

<svelte:head>
	<title>{title} — Work — Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="{title} — Work — Tidal Theory" />
	<meta property="og:description" content={shortLede} />
</svelte:head>

<article>
	<PageIntro>
		{title}
		<div slot="intro" class="grid gap-6 md:gap-10 xl:gap-12" let:intersecting>
			<div class="grid gap-2 md:gap-3">
				<FadeUp showing={intersecting} delay={100}>
					<time><time>{startDateNice}</time> – <time>{endDateNice}</time></time>
				</FadeUp>
				<div class="flex flex-wrap gap-2">
					{#each discipline as text, index}
						<FadeUp showing={intersecting} delay={150 + index * 50}>
							<FBadge>{text}</FBadge>
						</FadeUp>
					{/each}
				</div>
			</div>
			<FadeUp showing={intersecting} delay={200}>
				<TextLede>
					<PortableText value={lede} />
				</TextLede>
			</FadeUp>
		</div>
	</PageIntro>
	{#if content}
		<PageSection>
			<div class="prose prose-invert">
				<PortableText value={content} />
			</div>
		</PageSection>
	{/if}
</article>

<style>
time:has(time) {
	--font-size-px: 16;
	--line-height-offset: calc(
		(((var(--line-height-scale) * var(--font-size-px)) - 24) / 2) /
			var(--font-size-px)
	);

	font-size: 1rem /* 16px */;
	font-weight: 500;
	line-height: 1.5rem /* 24px */;
	color: rgb(192 200 205 / 1);
	font-feature-settings: 'salt' 1;

	@media (min-width: 768px) {
		--font-size-px: 18;
		--line-height-offset: calc(
			(((var(--line-height-scale) * var(--font-size-px)) - 28) / 2) /
				var(--font-size-px)
		);

		font-size: 1.125rem /* 18px */;
		line-height: 1.75rem /* 28px */;
	}

	&::before {
		display: table;
		content: '';
		margin-bottom: calc(
			(
					(
							var(--ascent-scale) - var(--cap-height-scale) +
								var(--line-gap-scale) / 2
						) -
						var(--line-height-offset)
				) *
				-1em
		);
	}
	&::after {
		display: table;
		content: '';
		margin-top: calc(
			(
					(var(--descent-scale) + var(--line-gap-scale) / 2) -
						var(--line-height-offset)
				) *
				-1em
		);
	}
}
</style>
