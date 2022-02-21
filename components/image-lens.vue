<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		image: {
			type: Object,
			default: () => {},
		},
	},
	computed: {
		// The `static` dir isn't needed with Nuxt's routing.
		basePath() {
			return this.$props.image.path.replace(/^static/, '')
		},
		hasAvif() {
			return this.$props.image.formats && this.$props.image.formats.avif
		},
		hasWebp() {
			return this.$props.image.formats && this.$props.image.formats.webp
		},
	},
})
</script>

<template>
	<picture>
		<source v-if="hasAvif" type="image/avif" />
		<source v-if="hasWebp" type="image/webp" />
		<img
			:src="basePath"
			:width="image.dimensions.width"
			:height="image.dimensions.height"
		/>
	</picture>
</template>
