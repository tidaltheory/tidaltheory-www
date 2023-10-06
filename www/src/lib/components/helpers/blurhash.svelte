<script>
import { onMount } from 'svelte'

import { decode } from 'blurhash'

/** @type {string} */
export let hash
/** @type {number} */
export let aspectRatio
export let width
export let height
// Export let resolutionX = 64
// export let resolutionY = 64
export let punch = 1

let canvas

onMount(() => {
	if (hash && canvas) {
		const pixels = decode(hash, width, height, punch)
		const context = canvas.getContext('2d')
		const imageData = context.createImageData(width, height)
		imageData.data.set(pixels)
		context.putImageData(imageData, 0, 0)
	}
})
</script>

<canvas
	bind:this={canvas}
	{width}
	{height}
	class="w-full"
	style:aspect-ratio={aspectRatio}
/>
