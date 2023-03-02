<script>
import ImageLens from '$lib/components/image-lens.svelte'
import PageContent from '$lib/components/page-content.svelte'
import PageIntro from '$lib/components/page-intro.svelte'

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
	<PageContent>
		<div class="wrapper prose relative">
			{#each blocks as block}
				{#if block.type === 'markdown'}
					{@html block.content}
				{:else if block.type === 'image'}
					<figure class="not-prose m-0 my-[2em] flex">
						<ImageLens
							image={block.image.thumbnails}
							sizes={['gallery-sm', 'gallery-md']}
						/>
					</figure>
				{:else if block.type === 'aside'}
					<aside class="">
						<div class="prose-sm text-grey-400">
							{@html block.content}
						</div>
					</aside>
				{:else if block.type === 'code'}
					<figure class="m-0 my-[2em]">
						<pre class="p-4"><code class="language-{block.language}"
								>{@html block.content}</code
							></pre>
					</figure>
				{/if}
			{/each}
		</div>
	</PageContent>
</article>

<style>
.wrapper {
	container: prose / inline-size;
	/* grid-column: content; */
}
</style>
