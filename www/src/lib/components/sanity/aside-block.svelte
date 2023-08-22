<script>
import PortableText from '../portable-text.svelte'

/** @type {import('@portabletext/svelte').CustomBlockComponentProps} */
export let portableText

$: ({ value } = portableText)
</script>

<aside class="">
	<div class="prose-sm text-grey-400">
		<PortableText value={value.content} />
	</div>
</aside>
