<script>
import PageSection from '$lib/components/page-section.svelte'
import PortableText from '$lib/components/portable-text.svelte'

/** @type {import('./$types').PageData} */
export let data

$: ({ title, content } = data)
</script>

<svelte:head>
	<title>{title} — Tidal Theory</title>
	<meta property="og:title" content="{title} — Tidal Theory" />
	<!-- <meta property="og:description" content={excerpt} /> -->
</svelte:head>

<article>
	<PageSection>
		<div class="grid grid-cols-4 xl:grid-cols-2 xl:gap-16">
			<div class="col-span-full grid gap-6 md:col-span-3 md:pt-8 xl:pt-12">
				<div class="prose prose-xl prose-invert md:prose-2xl">
					<PortableText value={content} />
				</div>
			</div>
			<div
				class="col-span-3 col-start-2 row-start-2 pt-[9vh] md:pt-[11vh] xl:pt-36"
			>
				<time>{title}</time>
			</div>
		</div>
	</PageSection>
</article>
