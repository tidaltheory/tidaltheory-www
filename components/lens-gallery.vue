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
		isHidden: {
			type: Boolean,
		},
		onOpen: {
			type: Function,
			required: true,
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
		<template #default="{ item, index }">
			<button
				class="flex transition"
				type="button"
				:class="isHidden && 'opacity-30'"
				:data-index="index"
				@click="onOpen(index)"
			>
				<ImageLens
					:image="item.thumbnails"
					:sizes="['gallery-sm', 'gallery-md', 'gallery-lg']"
				/>
			</button>
		</template>
	</MasonryGrid>
</template>

<style lang="postcss" module>
.thumbs {
	grid: 1fr auto / repeat(2, 1fr);
	grid: masonry / repeat(2, 1fr);
	place-items: center;
}
</style>
