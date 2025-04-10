<script>
import { onMount } from 'svelte'

import { urlFor } from '$lib/sanity/image'

/**
 * @typedef {Object} Props
 * @property {import('@portabletext/svelte').CustomBlockComponentProps} portableText
 */

/** @type {Props} */
let { portableText } = $props()

/** @type {HTMLImageElement | null} */
let imgElement = $state(null)

/** @param {HTMLImageElement} target */
function reveal(target) {
	target.parentElement?.classList.remove('opacity-0')
}

onMount(() => {
	if (imgElement?.complete) reveal(imgElement)
})
</script>

<figure class="m-0 my-[2em] flex">
	<picture class="opacity-0 transition-opacity duration-300">
		<source
			srcset={urlFor(portableText.value).format('webp').url()}
			type="image/webp"
		/>
		<img
			bind:this={imgElement}
			use:reveal
			class="h-full w-full object-contain"
			loading="lazy"
			decoding="async"
			alt={portableText.value.alt ?? ''}
			sizes="100vw"
			srcset={urlFor(portableText.value).format('jpg').url()}
			src={urlFor(portableText.value).format('jpg').url()}
		/>
	</picture>
	<!-- <ImageLens
		image={block.image.thumbnails}
		sizes={['gallery-sm', 'gallery-md']}
	/> -->
</figure>
