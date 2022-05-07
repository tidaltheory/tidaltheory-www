<script>
import ImageLens from './image-lens.vue'

export default {
	components: { ImageLens },
	props: {
		to: { type: String, default: '/' },
		cover: { type: Object, default: () => {} },
	},
	computed: {
		color() {
			return this.cover ? [this.cover.colors] : 'rgb(57 62 65)'
		},
	},
}
</script>

<template>
	<div class="relative grid grid-rows-1 bg-grey-700 overflow-hidden">
		<ImageLens
			v-if="cover"
			:image="cover.thumbnails"
			:sizes="['cover-sm', 'cover-md', 'cover-lg']"
			class="mix-blend-luminosity"
		/>
		<div class="absolute inset-0 flex">
			<NuxtLink
				class="peer w-full z-10 self-end before:absolute before:inset-0"
				:to="to"
			>
				<div
					class="w-full p-6 lg:p-10 bg-grey-900 bg-opacity-50 backdrop-blur firefox:bg-opacity-80"
				>
					<div
						class="font-display text-2xl lg:text-4xl font-bold leading-trim tracking-wide uppercase"
					>
						<slot />
					</div>
				</div>
			</NuxtLink>
			<div
				class="absolute inset-0 z-0 opacity-0 peer-hover:opacity-50"
				:style="{ backgroundColor: color }"
			/>
		</div>
	</div>
</template>
