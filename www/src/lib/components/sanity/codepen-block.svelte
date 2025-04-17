<script>
import PortableText from '../portable-text.svelte'

/**
 * @typedef {Object} Props
 * @property {import('@portabletext/svelte').CustomBlockComponentProps} portableText
 */

/** @type {Props} */
let { portableText } = $props()

const urlParts = portableText.value.url.split('/')
const embedUrl = `https://codepen.io/${urlParts[3]}/embed/${urlParts[5]}?height=370&theme-id=dark&default-tab=result`
</script>

<figure>
	<iframe
		height="370"
		style="width:100%;"
		scrolling="no"
		title="CodePen Embed"
		src={embedUrl}
		frameborder="no"
		allowtransparency
		allowfullScreen
	></iframe>
	{#if portableText.value.caption}
		<figcaption>
			<small class="max-w-[60ch] text-sm"
				><PortableText value={portableText.value.caption} /></small
			>
		</figcaption>
	{/if}
</figure>
