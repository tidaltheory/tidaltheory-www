<script>
let { lqip, width, height, position } = $props()

/**
 * Reduce width down to 300px and scale height to match, while maintaining the
 * same aspect ratio.
 */
let resizeFactor = width / 300
let imgHeight = Math.round(height / resizeFactor)
</script>

<img
	class="h-full w-full object-cover"
	style:object-position={`${position.x * 100}% ${position.y * 100}%`}
	width={300}
	height={imgHeight}
	src={lqip}
	alt=""
/>
