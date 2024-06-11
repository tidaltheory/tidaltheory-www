<script>
import Heading from './heading.svelte'
import MentionLink from './mention-link.svelte'

export let project
</script>

<article class="flex flex-col gap-8 lg:gap-9">
	<Heading level={3}>{project.title}</Heading>
	<div class="flex justify-between">
		<div class="flex flex-wrap items-start gap-8">
			<MentionLink href="https://gibsonipsum.com">Visit site</MentionLink>
			<MentionLink href="https://github.com/stormwarning/gibsonipsum"
				>View code</MentionLink
			>
		</div>
		<div class="prose prose-invert max-w-lg">
			<p>
				The game’s level of detail, both in environments and in
				characters, makes for a really rewarding photo mode. I was
				caught up in landscapes mostly, but started incorporating the
				characters more as I got used to it.
			</p>
		</div>
	</div>
	<!-- <div>Images</div> -->
</article>
