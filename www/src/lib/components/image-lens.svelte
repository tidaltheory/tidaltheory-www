<script>
import { onMount } from 'svelte'

/** @typedef {import('@tidaltheory/lens').ImageRecord} ImageRecord */
/** @typedef {import('@tidaltheory/lens').ImageThumbnails} ImageThumbnails */

/**
 * @param {string} path
 */
function getPath(path = '') {
	return path.replace(/^static/, '')
}

/**
 * @typedef {Object} Props
 * @property {ImageRecord | ImageThumbnails} image
 * @property {Array<string> | undefined} [sizes]
 * @property {boolean} [lazyLoad]
 */

/** @type {Props} */
let { image, sizes = undefined, lazyLoad = true } = $props()

/** @type {HTMLImageElement | null} */
let imgElement = $state(null)

/** @type {ImageRecord} */
const imageObject = sizes ? image[sizes[0]] : image
const hasAvif = Boolean(imageObject.formats?.avif)
const hasWebp = Boolean(imageObject.formats?.webp)

const imgSet = () => {
	if (!sizes) return undefined

	/** @type {Array<string>} */
	let set = []
	for (const size of sizes) {
		set.push(`${getPath(image[size].path)} ${image[size].dimensions.width}w`)
	}

	return set.join(',')
}

const avifSet = () => {
	if (!sizes) return getPath(imageObject.formats?.avif)

	/** @type {Array<string>} */
	let set = []
	for (const size of sizes) {
		set.push(
			`${getPath(image[size].formats.avif)} ${image[size].dimensions.width}w`,
		)
	}

	return set.join(',')
}

const webpSet = () => {
	if (!sizes) return getPath(imageObject.formats?.webp)

	/** @type {Array<string>} */
	let set = []
	for (const size of sizes) {
		set.push(
			`${getPath(image[size].formats.webp)} ${image[size].dimensions.width}w`,
		)
	}

	return set.join(',')
}

/**
 * @param {HTMLImageElement} target
 */
function reveal(target) {
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

<picture class="opacity-0 transition-opacity duration-300">
	{#if hasAvif}<source srcset={avifSet()} type="image/avif" />{/if}
	{#if hasWebp}<source srcset={webpSet()} type="image/webp" />{/if}
	<img
		bind:this={imgElement}
		use:reveal
		class="h-full w-full object-contain"
		width={imageObject.dimensions.width}
		height={imageObject.dimensions.height}
		loading={lazyLoad ? 'lazy' : undefined}
		decoding="async"
		alt=""
		sizes="100vw"
		srcset={imgSet()}
		src={getPath(imageObject.path)}
	/>
</picture>
