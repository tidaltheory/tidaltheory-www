<script>
export default {
	props: {
		fullscreen: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<template>
	<div
		class="grid pt-[9vh] md:pt-[11vh] px-8 md:px-[10vw] xl:px-[10.5vw] pb-[18.5vh] md:pb-[22.5vh] xl:pb-[22vh]"
		:class="fullscreen && 'min-h-screen'"
	>
		<slot />
	</div>
</template>
