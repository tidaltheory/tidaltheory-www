<script>
import ObserveIntersection from 'svelte-intersection-observer'

import Heading from './heading.svelte'
import PageSection from './page-section.svelte'
import SubHeading from './sub-heading.svelte'

/**
 * @typedef {Object} Props
 * @property {string | false} [subtitle]
 * @property {import('svelte').Snippet} [children]
 * @property {import('svelte').Snippet<[any]>} [intro]
 */

/** @type {Props} */
let { subtitle = false, children, intro } = $props()

/** @type {HTMLDivElement} */
let header = $state()

/**
 * @todo Named by migration script, maybe rename to something better?
 */
// eslint-disable-next-line camelcase
const children_render = $derived(children)
</script>

<PageSection>
	<ObserveIntersection once element={header}>
		{#snippet children({ intersecting })}
			<div class="grid grid-cols-4 xl:grid-cols-2 xl:gap-16" bind:this={header}>
				<div
					class="col-span-full grid gap-4 md:col-span-3 md:gap-6 md:pt-8 xl:gap-8 xl:pt-12"
					class:opacity-0={!intersecting}
					style:transform="translateZ(0)"
				>
					<Heading shouldShow={intersecting} transitionIn>
						{@render children_render?.()}
					</Heading>
					{#if subtitle}
						<SubHeading level={3} shouldShow={intersecting}>
							{subtitle}
						</SubHeading>
					{/if}
				</div>
				{#if intro}
					<div
						class="col-span-3 col-start-2 row-start-2 pt-[9vh] md:pt-[11vh] xl:pt-36"
					>
						{@render intro?.({ intersecting })}
					</div>
				{/if}
			</div>
		{/snippet}
	</ObserveIntersection>
</PageSection>
