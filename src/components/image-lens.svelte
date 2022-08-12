<script lang="ts">
import type { ImageRecord, ImageThumbnails } from '@tidaltheory/lens'

function getPath(path: string = '') {
	return path.replace(/^static/, '')
}

export let image: ImageRecord | ImageThumbnails
export let sizes: Array<string>

const imageObject: ImageRecord = sizes ? image[sizes[0]] : image
const hasAvif = !!imageObject.formats?.avif
const hasWebp = !!imageObject.formats?.webp
const ratio = imageObject.dimensions.width / imageObject.dimensions.height
// const placeholderColor = color

const imgSet = () => {
	if (!sizes) return undefined

	let set: string[] = []
	for (const size of sizes) {
		set.push(
			`${getPath(image[size].path)} ${image[size].dimensions.width}w`
		)
	}
	return set.join(',')
}

const avifSet = () => {
	if (!sizes) return getPath(imageObject.formats?.avif)

	let set: string[] = []
	for (const size of sizes) {
		set.push(
			`${getPath(image[size].formats.avif)} ${
				image[size].dimensions.width
			}w`
		)
	}
	return set.join(',')
}

const webpSet = () => {
	if (!sizes) return getPath(imageObject.formats?.webp)

	let set: string[] = []
	for (const size of sizes) {
		set.push(
			`${getPath(image[size].formats.webp)} ${
				image[size].dimensions.width
			}w`
		)
	}
	return set.join(',')
}

function reveal(event: Event) {
	// event.target.classList.toggle('opacity-0')
	// console.log('LOADED')
	;(event.target as HTMLElement).parentElement?.classList.toggle('opacity-0')
	// event.target.animate({
	//         transform: ["scale(.9)", "none"],
	//         opacity: [0, 1],
	// },{
	//         duration: 700,
	//         easing: `cubic-bezier(.165,.84,.44,1)`
	// })
	// cubic-bezier(.165,.84,.44,1)
}
</script>

<picture
	class="max-h-full opacity-0 transition-opacity duration-300"
	width={imageObject.dimensions.width}
	height={imageObject.dimensions.height}
	style:aspect-ratio={ratio}
>
	{#if hasAvif}<source srcset={avifSet()} type="image/avif" />{/if}
	{#if hasWebp}<source srcset={webpSet()} type="image/webp" />{/if}
	<img
		class="h-full max-h-full w-full object-contain"
		src={getPath(imageObject.path)}
		srcset={imgSet()}
		width={imageObject.dimensions.width}
		height={imageObject.dimensions.height}
		loading="lazy"
		decoding="async"
		on:load|once={reveal}
		alt=""
	/>
</picture>
