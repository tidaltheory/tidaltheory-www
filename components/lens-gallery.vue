<script lang="ts">
import Vue from 'vue'

import ImageLens from '~/components/image-lens.vue'
import MasonryGrid from '~/components/masonry-grid.vue'

export default Vue.extend({
	components: {
		ImageLens,
		MasonryGrid,
	},

	props: {
		images: {
			type: Array,
			default: () => [],
		},
	},

	data() {
		return {
			isZoomed: false,
		}
	},

	computed: {},

	methods: {
		toggleZoom() {
			this.isZoomed = !this.isZoomed
		},
	},
})
</script>

<template>
	<MasonryGrid
		:items="images"
		:columns="2"
		gap-class="gap-4 md:gap-8 xl:gap-16"
	>
		<template #default="{ item }">
			<ImageLens
				:image="item.thumbnails"
				:sizes="['gallery-sm', 'gallery-md', 'gallery-lg']"
			/>
		</template>
	</MasonryGrid>
</template>

<style lang="postcss" module>
.thumbs {
	grid: 1fr auto / repeat(2, 1fr);
	grid: masonry / repeat(2, 1fr);
	place-items: center;
}

.zoom {
	position: fixed;
	grid: 100% / auto-flow 100%;
	width: 100vw;
	height: 100vh;
	scroll-snap-type: x mandatory;
}
</style>
