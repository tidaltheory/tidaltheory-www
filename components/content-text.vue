<script>
export default {
	props: {
		element: {
			type: String,
			default: 'span',
		},
	},
}
</script>

<template>
	<component
		:is="element"
		class="font-sans text-lg md:text-2xl leading-normal leading-trim text-grey-100"
	>
		<slot />
	</component>
</template>
