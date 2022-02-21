<script>
export default {
	props: {
		to: {
			type: String,
			default: '/',
		},
	},
}
</script>

<template>
	<div class="relative flex aspect-[5/4] bg-grey-700">
		<div class="self-end w-full p-6 lg:p-10 bg-grey-900 bg-opacity-50">
			<NuxtLink class="before:absolute before:inset-0" :to="to">
				<div
					class="font-display text-2xl lg:text-4xl font-bold leading-10 leading-trim tracking-wide uppercase"
				>
					<slot />
				</div>
			</NuxtLink>
		</div>
	</div>
</template>
