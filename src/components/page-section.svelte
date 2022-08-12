<script>
export let fullscreen = false
</script>

<div
	class="grid pt-[9vh] md:pt-[11vh] px-8 md:px-[10vw] xl:px-[10.5vw] pb-[18.5vh] md:pb-[22.5vh] xl:pb-[22vh]"
	class:min-h-screen={fullscreen}
>
	<slot />
</div>
