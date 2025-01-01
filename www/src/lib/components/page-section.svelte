<script>
export let fullscreen = false
</script>

<!--<div-->
<!--	class="grid px-8 pt-[9svh] pb-[18.5svh] md:px-[10vw] md:pt-[11vh] md:pb-[22.5vh] xl:px-[10.5vw] xl:pb-[22vh]"-->
<!--	class:min-h-[calc(100svh_-_4rem)]={fullscreen}-->
<!--&gt;-->
<div class="section" class:full-height={fullscreen}>
	<slot />
</div>

<style>
.section {
	display: grid;
	max-inline-size: 1440px;
	container: inline-size;
	padding: 9svb 32px 18.5svb;
	margin-inline: auto;

	@media (min-width: 768px) {
		padding: 11svb 10cqi 22.5svb;
	}

	@media (min-width: 1280px) {
		padding: 11svb 11cqi 22svb;
	}
}

.full-height {
	min-block-size: calc(100svb - 64px);
}
</style>
