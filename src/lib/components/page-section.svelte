<script>
export let fullscreen = false
</script>

<div
	class="grid px-8 pt-[9svh] pb-[18.5svh] md:px-[10vw] md:pt-[11vh] md:pb-[22.5vh] xl:px-[10.5vw] xl:pb-[22vh]"
	class:min-h-[calc(100svh_-_4rem)]={fullscreen}
>
	<slot />
</div>
