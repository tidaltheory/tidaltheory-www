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
		isOpen: { type: Boolean },
		onClose: {
			type: Function,
			required: true,
		},
	},
})
</script>

<template>
	<div class="fixed inset-0 z-[99] duration-200">
		<div
			class="fixed inset-0 z-[99] bg-grey-900 bg-opacity-50 backdrop-blur firefox:bg-opacity-80 transition"
		/>
		<div :class="$style.zoom">
			<button
				v-for="(image, index) in images"
				:key="index"
				class="flex items-center justify-center p-2 md:p-4 xl:p-8 snap-center"
				type="button"
				:data-index="index"
				@click="onClose(index)"
			>
				<ImageLens :image="image" />
			</button>
		</div>
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
	width: 100vw;
	height: 100vh;
	overflow: auto;
	scroll-snap-type: x mandatory;
}
</style>
