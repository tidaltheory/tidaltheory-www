<script lang="ts">
import { onMount } from 'svelte'

import type { ImageRecord, ImageThumbnails } from '@tidaltheory/lens'

function getPath(path: string = '') {
	return path.replace(/^static/, '')
}

export let image: ImageRecord | ImageThumbnails
// eslint-disable-next-line no-undef-init
export let sizes: Array<string> | undefined = undefined
export let lazyLoad = true

let imgElement: HTMLImageElement | null = null

const imageObject: ImageRecord = sizes ? image[sizes[0]] : image
const hasAvif = Boolean(imageObject.formats?.avif)
const hasWebp = Boolean(imageObject.formats?.webp)
const ratio = imageObject.dimensions.width / imageObject.dimensions.height
// Const placeholderColor = color

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

function reveal(target: HTMLImageElement) {
	// Event.target.classList.toggle('opacity-0')
	// console.log('LOADED')
	target.parentElement?.classList.remove('opacity-0')
	// Event.target.animate({
	//         transform: ["scale(.9)", "none"],
	//         opacity: [0, 1],
	// },{
	//         duration: 700,
	//         easing: `cubic-bezier(.165,.84,.44,1)`
	// })
	// cubic-bezier(.165,.84,.44,1)
}

onMount(() => {
	if (imgElement?.complete) reveal(imgElement)
})
</script>

<picture
	class="h-full w-full opacity-0 transition-opacity duration-300"
	style:aspect-ratio={ratio}
	style:max-width={imageObject.dimensions.width}
	style:max-height={imageObject.dimensions.height}
>
	{#if hasAvif}<source srcset={avifSet()} type="image/avif" />{/if}
	{#if hasWebp}<source srcset={webpSet()} type="image/webp" />{/if}
	<img
		bind:this={imgElement}
		class="h-full w-full object-contain"
		src={getPath(imageObject.path)}
		srcset={imgSet()}
		width={imageObject.dimensions.width}
		height={imageObject.dimensions.height}
		loading={lazyLoad ? 'lazy' : undefined}
		decoding="async"
		use:reveal
		alt=""
	/>
</picture>
