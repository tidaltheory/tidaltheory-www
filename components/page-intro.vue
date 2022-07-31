<script>
import ContentHeading from '~/components/content-heading.vue'
import ContentText from '~/components/content-text.vue'
import PageSection from '~/components/page-section.vue'

export default {
	components: { ContentHeading, PageSection, ContentText },
}
</script>

<template>
	<PageSection>
		<div class="grid grid-cols-4 xl:grid-cols-2 xl:gap-16">
			<div
				class="grid gap-6 col-span-full md:col-span-3 md:pt-8 xl:pt-12"
			>
				<ContentHeading>
					<slot />
				</ContentHeading>

				<h2
					v-if="!!$slots.subtitle"
					:style="{ '--delay': '100ms' }"
					class="text-item font-display text-2xl md:text-4xl xl:text-5xl font-bold leading-none leading-trim text-grey-400 uppercase"
				>
					<slot name="subtitle" />
				</h2>
			</div>
			<div
				v-if="!!$slots.intro"
				class="col-span-3 col-start-2 row-start-2 pt-[9vh] md:pt-[11vh] xl:pt-36"
			>
				<ContentText element="p">
					<slot name="intro" />
				</ContentText>
			</div>
		</div>
	</PageSection>
</template>

<style>
.text-item {
	transition: opacity 0.7s cubic-bezier(0.165, 0.84, 0.44, 1),
		transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
	transition-delay: var(--delay, 0);
}

.text-enter-from {
	opacity: 0;
	transform: rotateX(75deg) rotateY(10deg) rotateZ(-9deg);
}
.text-enter-to {
	opacity: 1;
	transform: rotateX(0) rotateY(0) rotateZ(0);
}
</style>
