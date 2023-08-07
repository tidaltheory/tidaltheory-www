<script>
import ObserveIntersection from 'svelte-intersection-observer'

import Heading from './heading.svelte'
import PageSection from './page-section.svelte'
import SubHeading from './sub-heading.svelte'

/** @type {string | false} */
export let subtitle = false

/** @type {HTMLDivElement} */
let header
</script>

<PageSection>
	<ObserveIntersection once element={header} let:intersecting>
		<div
			class="grid grid-cols-4 xl:grid-cols-2 xl:gap-16"
			bind:this={header}
		>
			<div
				class="col-span-full grid gap-6 md:col-span-3 md:pt-8 xl:pt-12"
				class:opacity-0={!intersecting}
				style:transform="translateZ(0)"
			>
				<Heading shouldShow={intersecting} transitionIn>
					<slot />
				</Heading>
				{#if subtitle}
					<SubHeading level="3" shouldShow={intersecting}>
						{subtitle}
					</SubHeading>
				{/if}
			</div>
			{#if $$slots.intro}
				<div
					class="header-intro col-span-3 col-start-2 row-start-2 pt-[9vh] md:pt-[11vh] xl:pt-36"
					class:translate-y-[1.5vh]={!intersecting}
					class:opacity-0={!intersecting}
					style="--delay: 100ms"
				>
					<slot name="intro" />
				</div>
			{/if}
		</div>
	</ObserveIntersection>
</PageSection>

<style>
.header-intro {
	transition:
		transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
		opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition-delay: var(--delay, 0);
}
</style>
