<script lang="ts">
import Vue from 'vue'

import LogoClari from '~/components/logo-clari.vue'
import LogoLift from '~/components/logo-lift.vue'
import LogoShowbie from '~/components/logo-showbie.vue'

const sites = {
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

export default Vue.extend({
	props: {
		site: {
			type: String,
			required: true,
		},
	},

	computed: {
		href() {
			return sites[this.site].href
		},
		logo() {
			return sites[this.site].logo
		},
	},
})
</script>

<template>
	<a
		class="inline-flex items-baseline gap-1 pr-2 pl-1 py-px bg-grey-700 hover:bg-grey-600 text-white rounded align-baseline"
		:href="href"
	>
		<component :is="logo" class="self-center" />
		<span class="font-semibold tracking-tight leading-7">
			<slot />
		</span>
	</a>
</template>
