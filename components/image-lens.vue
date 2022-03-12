<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		image: {
			type: Object,
			default: () => {},
		},
		sizes: { type: Array as () => string[], default: undefined },
	},

	computed: {
		imageObject() {
			return this.sizes ? this.image[this.sizes[0]] : this.image
		},
		hasAvif() {
			return this.imageObject.formats && this.imageObject.formats.avif
		},
		hasWebp() {
			return this.imageObject.formats && this.imageObject.formats.webp
		},
		ratio() {
			return (
				this.imageObject.dimensions.width /
				this.imageObject.dimensions.height
			)
		},
		imgSet() {
			if (!this.sizes) return undefined

			let set: string[] = []
			for (const size of this.sizes) {
				set.push(`${this.getPath(this.image[size].path)} ${this.image[size].dimensions.width}w`)
			}
			return set.join(',')
		},
		avifSet() {
			if (!this.sizes) return this.getPath(this.image.formats.avif)

			let set: string[] = []
			for (const size of this.sizes) {
				set.push(`${this.getPath(this.image[size].formats.avif)} ${this.image[size].dimensions.width}w`)
			}
			return set.join(',')
		},
		webpSet() {
			if (!this.sizes) return this.getPath(this.image.formats.webp)

			let set: string[] = []
			for (const size of this.sizes) {
				set.push(`${this.getPath(this.image[size].formats.webp)} ${this.image[size].dimensions.width}w`)
			}
			return set.join(',')
		},
	},

	methods: {
		/** The `static` dir isn't needed with Nuxt's routing. */
		getPath(path) {
			return path.replace(/^static/, '')
		},

                reveal(event) {
                        event.target.classList.toggle('opacity-0')
                        event.target.animate({
                                transform: ["scale(.9)", "none"],
                                opacity: [0, 1],
                        },{
                                duration: 700,
                                easing: `cubic-bezier(.165,.84,.44,1)`
                        })
                        // cubic-bezier(.165,.84,.44,1)
                }
	},
})
</script>

<template>
	<picture class="flex" :style="{ aspectRatio: ratio }">
		<source v-if="hasAvif" :srcset="avifSet" type="image/avif" />
		<source v-if="hasWebp" :srcset="webpSet" type="image/webp" />
		<img
			class="w-full h-full object-contain opacity-0"
			:src="getPath(imageObject.path)"
			:srcset="imgSet"
			:width="imageObject.dimensions.width"
			:height="imageObject.dimensions.height"
			loading="lazy"
			@load="reveal"
		/>
	</picture>
</template>
