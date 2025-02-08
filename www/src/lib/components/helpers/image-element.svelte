<script>
import { onMount } from 'svelte'

/**
 * @typedef {Object} Props
 * @property {object} imgAttributes
 * @property {number} widthInt
 * @property {number} heightInt
 * @property {boolean} isLazy
 * @property {'eager' | 'lazy'} loading
 * @property {unknown} onError
 */

/** @type {Props} */
let {
	imgAttributes,
	widthInt,
	heightInt,
	isLazy,
	loading = $bindable(),
	onError,
} = $props()

loading = isLazy ? 'lazy' : loading

/** @type {HTMLImageElement} */
let element = $state()

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
