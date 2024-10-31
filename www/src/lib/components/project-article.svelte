<script>
import FaviconGithub from './icons/favicon-github.svelte'
import Heading from './heading.svelte'
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
				<MentionLink href={project.post}>Read blog post</MentionLink>
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
	<!-- <div>Images</div> -->
</article>
