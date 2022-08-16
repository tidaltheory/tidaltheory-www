<script>
export let fullscreen = false
</script>

<div
	class="grid px-8 pt-[9vh] pb-[18.5vh] md:px-[10vw] md:pt-[11vh] md:pb-[22.5vh] xl:px-[10.5vw] xl:pb-[22vh]"
	class:min-h-screen={fullscreen}
>
	<slot />
</div>
