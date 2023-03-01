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
	<meta
		name="twitter:card"
		content={coverImage ? 'summary_large_card' : 'summary'}
	/>
	<meta property="og:title" content="{title} — Tidal Theory" />
	<meta property="og:description" content={excerpt} />
	{#if coverImage}<meta
			property="og:image"
			content={`https://tidaltheory.io${coverImage}`}
		/>{/if}
</svelte:head>

<article>
	<PageIntro>
		{title}
	</PageIntro>
	<PageSection>
		<div class="wrapper relative mx-auto w-full max-w-5xl">
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
				{:else if block.type === 'aside'}
					<aside class="">
						<div class="prose prose-sm text-grey-400">
							{@html block.content}
						</div>
					</aside>
				{:else if block.type === 'code'}
					<figure class="prose m-0 my-[1.25em]">
						<pre class="p-4"><code class="language-{block.language}"
								>{@html block.content}</code
							></pre>
					</figure>
				{/if}
			{/each}
		</div>
	</PageSection>
</article>

<style>
.wrapper {
	container: prose / inline-size;
}
</style>
