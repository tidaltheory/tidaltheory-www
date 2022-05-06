<script>
import ContentHeading from '~/components/content-heading.vue'
import ContentText from '~/components/content-text.vue'
import PageSection from '~/components/page-section.vue'

export default {
	components: {
		ContentHeading,
		ContentText,
		PageSection,
	},
}
</script>

<template>
	<PageSection :fullscreen="true">
		<div class="relative grid grid-cols-4 h-full">
			<div
				class="z-10 row-start-1 col-start-1 col-span-full md:col-span-3 xl:col-span-2 md:pt-8 xl:pt-12"
			>
				<ContentHeading><slot /></ContentHeading>
			</div>
			<div
				v-if="!!$slots.intro"
				class="z-10 row-start-2 col-span-3 xl:col-span-2 self-end"
			>
				<ContentText element="p">
					<slot name="intro" />
				</ContentText>
			</div>
			<div
				class="absolute top-15 md:top-0 right-3 md:right-0 z-0 w-[66.5vw] aspect-[0.75] xl:aspect-auto max-h-[40.5vh] md:w-[55.5vw] md:h-[55vh] md:max-h-none xl:w-[31.5vw] xl:h-full"
			>
				<figure class="w-full h-full bg-grey-700">
					<slot name="hero" />
				</figure>
			</div>
		</div>
	</PageSection>
</template>
