<script>
// eslint-disable-next-line import/no-named-as-default-member, import/no-named-as-default, import/default
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
		<div class="grid grid-cols-4 xl:grid-cols-2 xl:gap-16" bind:this={header}>
			<div
				class="col-span-full grid gap-4 md:col-span-3 md:gap-6 md:pt-8 xl:gap-8 xl:pt-12"
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
					class="col-span-3 col-start-2 row-start-2 pt-[9vh] md:pt-[11vh] xl:pt-36"
				>
					<slot name="intro" {intersecting} />
				</div>
			{/if}
		</div>
	</ObserveIntersection>
</PageSection>
