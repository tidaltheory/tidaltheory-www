<script>
import ObserveIntersection from 'svelte-intersection-observer'

import Heading from './heading.svelte'
import PageSection from './page-section.svelte'

/** @type {HTMLElement} */
let header
</script>

<PageSection fullscreen={true}>
	<ObserveIntersection once element={header} let:intersecting>
		<div class="relative grid h-full grid-cols-4" bind:this={header}>
			<div
				class="z-10 col-span-full col-start-1 row-start-1 md:col-span-3 md:pt-8 xl:col-span-2 xl:pt-12"
				style:transform="translateZ(0)"
			>
				<Heading level="0" shouldShow={intersecting} transitionIn
					><slot /></Heading
				>
			</div>
			{#if $$slots.intro}
				<div class="z-10 col-span-3 row-start-2 self-end xl:col-span-2">
					<p
						class="text-grey-100 leading-trim salt font-sans text-lg md:text-xl"
					>
						<slot name="intro" {intersecting} />
					</p>
				</div>
			{/if}
			<div
				class="top-15 absolute right-3 z-0 aspect-[0.75] max-h-[40.5vh] w-[66.5vw] md:right-0 md:top-0 md:h-[55vh] md:max-h-none md:w-[55.5vw] xl:aspect-auto xl:h-full xl:w-[31.5vw]"
			>
				<!-- <figure class="h-full w-full bg-grey-700">
					<slot name="hero" />
				</figure> -->
			</div>
		</div>
	</ObserveIntersection>
</PageSection>
