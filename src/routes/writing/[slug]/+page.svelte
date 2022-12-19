<script>
import ImageLens from '$lib/components/image-lens.svelte'
import PageIntro from '$lib/components/page-intro.svelte'
import PageSection from '$lib/components/page-section.svelte'

/** @type {import('./$types').PageData} */
export let data

$: ({ page } = data)
$: ({ title, excerpt, coverImage, blocks } = page)
</script>

<svelte:head>
	<title>{title} — Tidal Theory</title>
	<meta property="og:title" content="{title} — Tidal Theory" />
	<meta property="og:description" content={excerpt} />
	<meta property="og:image" content={`https://tidaltheory.io${coverImage}`} />
</svelte:head>

<article>
	<PageIntro>
		{title}
	</PageIntro>
	<PageSection>
		<div class="max-w-5xl">
			{#each blocks as block}
				{#if block.type === 'markdown'}
					<div class="prose prose-invert">
						{@html block.content}
					</div>
				{:else if block.type === 'image'}
					<div class="flex justify-end py-12">
						<div class="max-w-4xl">
							<ImageLens
								image={block.image.thumbnails}
								sizes={['gallery-sm', 'gallery-md']}
							/>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</PageSection>
</article>
