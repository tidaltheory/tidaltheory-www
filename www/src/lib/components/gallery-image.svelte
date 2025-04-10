<script>
let { image } = $props()
let srcset = $derived(
	`${image.srcset.md} 600w, ${image.srcset.lg} 1200w, ${image.srcset.xl} 2400w,`,
)
</script>

<img
	width={image.metadata.dimensions.width}
	height={image.metadata.dimensions.height}
	loading="eager"
	decoding="async"
	{srcset}
	sizes="(min-width: 1024px) 84vw, (min-width: 768px) 84vw, 90vw"
	src={image.srcset.sm}
	alt=""
/>
