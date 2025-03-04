<script>
import { urlFor } from '$lib/sanity/image.js'

import Heading from './heading.svelte'
import FaviconGithub from './icons/favicon-github.svelte'
import IconRSS from './icons/icon-rss.svelte'
import MentionLink from './mention-link.svelte'
import PortableText from './portable-text.svelte'

export let project
</script>

<article class="flex flex-col gap-8 lg:gap-9">
	<Heading level={3}>{project.title}</Heading>
	<div class="flex flex-wrap items-start gap-8 md:flex-nowrap">
		<div
			class="flex flex-auto flex-wrap items-start gap-x-8 gap-y-4 md:flex-[25%] lg:flex-1"
		>
			{#if project.site}
				<MentionLink href={project.site}>Visit site</MentionLink>
			{/if}
			{#if project.post}
				<MentionLink href={project.post} logo={IconRSS}>Read post</MentionLink>
			{/if}
			{#if project.repo}
				<MentionLink href={project.repo} logo={FaviconGithub}
					>View code</MentionLink
				>
			{/if}
		</div>
		<div class="prose prose-invert max-w-lg flex-auto lg:flex-1">
			<PortableText value={project.lede} />
		</div>
	</div>
	{#if project.images?.length > 0}
		<div class="l:gap-8 flex justify-end gap-6">
			{#each project.images as image}
				<figure class="not-prose m-0 flex">
					<picture class="transition-opacity duration-300">
						<source
							srcset={urlFor(image).format('webp').url()}
							type="image/webp"
						/>
						<img
							class="h-full object-contain"
							style:aspect-ratio={image.metadata.dimensions.aspectRatio}
							style:max-height="{Math.floor(
								image.metadata.dimensions.height / 2,
							)}px"
							loading="lazy"
							decoding="async"
							alt=""
							sizes="100vw"
							srcset={urlFor(image).format('jpg').url()}
							src={urlFor(image).format('jpg').url()}
						/>
					</picture>
				</figure>
			{/each}
		</div>
	{/if}
</article>
