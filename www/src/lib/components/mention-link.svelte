<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import FaviconGibson from './icons/favicon-gibson.svelte'
import FaviconOpentype from './icons/favicon-opentype.svelte'
import FaviconPolychroma from './icons/favicon-polychroma.svelte'
import FaviconTypeset from './icons/favicon-typeset.svelte'
import LogoClari from './logo-clari.svelte'
import LogoLift from './logo-lift.svelte'
import LogoShowbie from './logo-showbie.svelte'

const SITES = {
	lift: {
		href: 'https://liftinteractive.com',
		logo: LogoLift,
	},
	showbie: {
		href: 'https://www.showbie.com',
		logo: LogoShowbie,
	},
	clari: {
		href: 'https://www.clari.com',
		logo: LogoClari,
	},
	instagram: {
		href: 'https://www.instagram.com/stormwarning/',
		logo: undefined,
	},
	flickr: {
		href: 'https://www.flickr.com/photos/rustyangel/',
		logo: undefined,
	},
	letterboxd: {
		href: 'https://letterboxd.com/stormwarning/',
		logo: undefined,
	},
}

/**
 * @typedef {Object} Props
 * @property {keyof typeof SITES} [site]
 * @property {string} [href]
 * @property {any} [logo]
 * @property {import('svelte').Snippet} [children]
 */

/** @type {Props} */
let {
	site = undefined,
	href = $bindable(undefined),
	logo = $bindable(undefined),
	children,
} = $props()

if (site) {
	href = SITES[site].href
	logo = SITES[site].logo
}

if (!logo) {
	if (href.includes('typeset')) logo = FaviconTypeset
	if (href.includes('gibsonipsum')) logo = FaviconGibson
	if (href.includes('polychroma')) logo = FaviconPolychroma
	if (href.includes('opentype')) logo = FaviconOpentype
}

const SvelteComponent = $derived(logo)
</script>

<a
	class="bg-grey-700 hover:bg-grey-600 inline-flex items-baseline gap-1 rounded px-1 align-baseline text-white no-underline {FOCUS_OUTLINE}"
	{href}
	target="_blank"
	rel="noopener noreferrer"
>
	<SvelteComponent />
	<span class="font-semibold tracking-tight">
		{@render children?.()}
	</span>
</a>
