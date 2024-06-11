<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

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

/** @type {keyof typeof SITES} */
export let site = undefined
export let href = undefined
export let logo = undefined

if (site) {
	href = SITES[site].href
	logo = SITES[site].logo
}
</script>

<a
	class="bg-grey-700 hover:bg-grey-600 inline-flex items-baseline gap-1 rounded px-1 align-baseline text-white no-underline {FOCUS_OUTLINE}"
	{href}
	target="_blank"
	rel="noopener noreferrer"
>
	<svelte:component this={logo} />
	<span class="font-semibold tracking-tight">
		<slot />
	</span>
</a>
