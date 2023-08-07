<script>
import { onMount } from 'svelte'

/** @type {object} */
export let imgAttributes
/** @type {number} */
export let widthInt
/** @type {number} */
export let heightInt
/** @type {boolean} */
export let isLazy
/** @type {'eager' | 'lazy'} */
export let loading
/** @type {unknown} */
export let onError

loading = isLazy ? 'lazy' : loading

/** @type {HTMLImageElement} */
let element

/**
 * @param {HTMLImageElement} img
 * @param {string} source
 */
async function handleLoading(img, source) {
	// @ts-ignore
	if (!img || img['data-loaded-src'] === source) return

	// @ts-ignore
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
