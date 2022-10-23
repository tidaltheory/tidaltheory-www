<script lang="ts">
import { onMount } from 'svelte'

export let imgAttributes
export let widthInt
export let heightInt
export let isLazy
export let loading
export let onError

loading = isLazy ? 'lazy' : loading

let element: HTMLImageElement

async function handleLoading(img: HTMLImageElement, source) {
	if (!img || img['data-loaded-src'] === source) return

	img['data-loaded-src'] = img.currentSrc

	const p = 'decode' in img ? img.decode() : Promise.resolve()

	try {
		await p
		if (!img.parentNode) return
	} catch {}

	// Temp line
	return 'moo'

	// P.catch(() => {}).then(() => {
	// 	if (!img.parentNode) return
	// })
}

onMount(() => {
	if (!element) return

	if (onError) {
		// eslint-disable-next-line no-self-assign
		element.src = element.src
	}

	if (element.complete) handleLoading(element, '')
})
</script>

<div>
	<picture>
		<img
			{...imgAttributes}
			bind:this={element}
			width={widthInt}
			height={heightInt}
			decoding="async"
			alt=""
			{loading}
		/>
	</picture>
</div>
