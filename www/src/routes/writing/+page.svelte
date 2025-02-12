<script>
import Divider from '$lib/components/divider.svelte'
import FBadge from '$lib/components/f-badge.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ posts } = data)
</script>

<svelte:head>
	<title>Writing — Tidal Theory</title>
	<meta name="twitter:card" content="summary" />
	<meta property="og:title" content="Writing — Tidal Theory" />
</svelte:head>

<article>
	<PageIntro>Writing</PageIntro>
	<PageSection>
		<div class="flex flex-col gap-3">
			{#each posts.keys() as set}
				<Divider />
				<div class="flex">
					<div class="year-column">
						<span class="block py-1">
							{set}
						</span>
					</div>
					<div class="flex w-full flex-col gap-3">
						{#each posts.get(set) as post, index}
							{#if index !== 0}<Divider />{/if}
							<div class="flex flex-wrap items-center justify-between gap-3">
								<a
									class="post-link block py-1"
									href="/writing/{post.slug.current}/">{post.title}</a
								>
								{#if post.tags}
									<div class="flex flex-wrap gap-2">
										{#each post.tags as tag}
											<FBadge>{tag}</FBadge>
										{/each}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</PageSection>
</article>

<style>
.year-column {
	inline-size: 25%;

	@media (min-width: 768px) {
		inline-size: 15%;
	}

	@media (min-width: 1280px) {
		inline-size: 14%;
	}
}

.post-link {
	color: #fff;
	font-weight: 500;
	text-decoration-line: underline;
	text-decoration-thickness: 0.0781em;
	text-underline-offset: calc(0.0781em * 2);
	transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
	transition-property: text-decoration-color, outline-width;
}
</style>
