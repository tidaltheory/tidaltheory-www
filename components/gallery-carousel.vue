<script lang="ts">
import Vue from 'vue'

import ImageLens from '~/components/image-lens.vue'

export default Vue.extend({
	components: {
		ImageLens,
	},

	props: {
		images: {
			type: Array,
			default: () => [],
		},
		onClose: {
			type: Function,
			required: true,
		},
	},
})
</script>

<template>
	<div :class="$style.zoom">
		<button
			v-for="(image, index) in images"
			:key="index"
			class="snap-center"
			type="button"
			:data-index="index"
			@click="onClose(index)"
		>
			<ImageLens :image="image" />
		</button>
	</div>
</template>

<style lang="postcss" module>
.zoom {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	display: grid;
	grid: 100% / auto-flow 100%;
	height: 100vh;
	overflow: auto;
	scroll-snap-type: x mandatory;
}
</style>
