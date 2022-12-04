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
	},
	flickr: {
		href: 'https://www.flickr.com/photos/rustyangel/',
	},
}

/** @type keyof typeof SITES */
export let site

const { href, logo } = SITES[site]
</script>

<a
	class="inline-flex items-baseline gap-1 rounded bg-grey-700 px-1 align-baseline text-white no-underline hover:bg-grey-600 {FOCUS_OUTLINE}"
	{href}
	target="_blank"
	rel="noopener noreferrer"
>
	<svelte:component this={logo} />
	<span class="font-semibold tracking-tight">
		<slot />
	</span>
</a>
