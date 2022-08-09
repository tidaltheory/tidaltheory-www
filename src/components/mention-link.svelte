<script>
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
}

/** @type keyof typeof SITES */
export let site

const href = SITES[site].href

const logo = SITES[site].logo
</script>

<a
	class="inline-flex items-baseline gap-1 px-1 bg-grey-700 hover:bg-grey-600 text-white rounded align-baseline"
	{href}
>
	<svelte:component this={logo} />
	<span class="font-semibold tracking-tight">
		<slot />
	</span>
</a>
