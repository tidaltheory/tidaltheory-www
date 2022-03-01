<script>
import ImageLens from './image-lens.vue'

export default {
	components: { ImageLens },
	props: {
		to: { type: String, default: '/' },
		cover: { type: Object, default: () => {} },
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
			<div
				class="self-end w-full p-6 lg:p-10 bg-grey-900 bg-opacity-50 backdrop-blur firefox:bg-opacity-80"
			>
				<NuxtLink class="before:absolute before:inset-0" :to="to">
					<div
						class="font-display text-2xl lg:text-4xl font-bold leading-10 leading-trim tracking-wide uppercase"
					>
						<slot />
					</div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
