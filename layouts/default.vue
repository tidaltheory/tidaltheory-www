<script>
import SiteNav from '~/components/site-nav.vue'

export default {
	components: {
		SiteNav,
	},
}
</script>

<template>
	<div class="grid w-screen h-screen">
		<SiteNav />
		<Nuxt class="mt-16 md:mt-0 md:ml-20" />
	</div>
</template>
