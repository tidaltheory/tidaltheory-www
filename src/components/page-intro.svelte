<script>
import PageSection from './page-section.svelte'
import Heading from './heading.svelte'
</script>

<PageSection>
	<div class="grid grid-cols-4 xl:grid-cols-2 xl:gap-16">
		<div class="grid gap-6 col-span-full md:col-span-3 md:pt-8 xl:pt-12">
			<Heading>
				<slot />
			</Heading>

			{#if $$slots.subtitle}
				<h2
					style="--delay: '100ms'"
					class="text-item font-display text-2xl md:text-4xl xl:text-5xl font-bold leading-none leading-trim text-grey-400 uppercase"
				>
					<slot name="subtitle" />
				</h2>
			{/if}
		</div>
		{#if $$slots.intro}
			<div
				class="col-span-3 col-start-2 row-start-2 pt-[9vh] md:pt-[11vh] xl:pt-36"
			>
				<p
					class="font-sans text-lg md:text-2xl ss-01 leading-trim text-grey-100"
				>
					<slot name="intro" />
				</p>
			</div>
		{/if}
	</div>
</PageSection>
