<script>
import PageSection from './page-section.svelte'
import Heading from './heading.svelte'
</script>

<PageSection fullscreen={true}>
	<div class="relative grid grid-cols-4 h-full">
		<div
			class="z-10 row-start-1 col-start-1 col-span-full md:col-span-3 xl:col-span-2 md:pt-8 xl:pt-12"
		>
			<Heading><slot /></Heading>
		</div>
		{#if $$slots.intro}
			<div class="z-10 row-start-2 col-span-3 xl:col-span-2 self-end">
				<p
					class="font-sans text-lg md:text-2xl ss-01 leading-trim text-grey-100"
				>
					<slot name="intro" />
				</p>
			</div>
		{/if}
		<div
			class="absolute top-15 md:top-0 right-3 md:right-0 z-0 w-[66.5vw] aspect-[0.75] xl:aspect-auto max-h-[40.5vh] md:w-[55.5vw] md:h-[55vh] md:max-h-none xl:w-[31.5vw] xl:h-full"
		>
			<figure class="w-full h-full bg-grey-700">
				<slot name="hero" />
			</figure>
		</div>
	</div>
</PageSection>
