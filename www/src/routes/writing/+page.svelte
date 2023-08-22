<script>
import Divider from '$lib/components/divider.svelte'
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
		<div class="prose prose-invert flex flex-col gap-3">
			{#each posts.keys() as set}
				<Divider />
				<div class="flex">
					<div class="w-3/12">
						<span class="block py-1">
							{set}
						</span>
					</div>
					<div class="flex flex-col gap-3 w-full">
						{#each posts.get(set) as post, index}
							{#if index !== 0}<Divider />{/if}
							<a
								class="block py-1"
								href="/writing/{post.slug.current}/"
								>{post.title}</a
							>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</PageSection>
</article>
