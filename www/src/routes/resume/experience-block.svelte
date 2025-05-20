<script>
import FBadge from '$lib/components/f-badge.svelte'
import PortableText from '$lib/components/portable-text.svelte'

let { role } = $props()
let { start, end, title, company, discipline, content } = $derived(role)
</script>

<article class="relative grid items-start gap-12">
	<header class="flex gap-2">
		<div class="flex basis-full flex-col gap-5">
			<h4 class="leading-trim text-lg font-medium">
				{title}, <em>{company}</em>
			</h4>
			<time class="text-grey-400 leading-trim font-medium"
				><time>{start}</time> – <time>{end}</time></time
			>
		</div>
		<div class="flex flex-wrap items-start gap-2">
			{#each discipline as text}
				<FBadge>{text}</FBadge>
			{/each}
		</div>
	</header>
	<div class="prose lg:order-2">
		<PortableText value={content} />
	</div>
</article>
