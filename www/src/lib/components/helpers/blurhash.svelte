<script>
import { onMount } from 'svelte'

import { decode } from 'blurhash'

/**
 * @typedef {Object} Props
 * @property {string} hash
 * @property {number} width
 * @property {number} height
 * @property {import('$lib/sanity/types').SanityImageHotspot} position
 * @property {number} [punch]
 */

/** @type {Props} */
let { hash, width, height, position, punch = 1 } = $props()

/** @type {HTMLCanvasElement} */
let canvas = $state()

/**
 * Reduce width down to 300px and scale height to match, while maintaining the
 * same aspect ratio.
 */
let resizeFactor = width / 300
let canvasHeight = Math.round(height / resizeFactor)

onMount(() => {
	if (hash && canvas) {
		const pixels = decode(hash, 300, canvasHeight, punch)
		const context = canvas.getContext('2d')
		const imageData = context.createImageData(300, canvasHeight)
		imageData.data.set(pixels)
		context.putImageData(imageData, 0, 0)
	}
})
</script>

<canvas
	bind:this={canvas}
	width="300"
	height={canvasHeight}
	class="h-full w-full object-cover"
	style:object-position={`${position.x * 100}% ${position.y * 100}%`}
></canvas>
