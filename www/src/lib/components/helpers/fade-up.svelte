<script>
export let showing = false
export let delay = 0
export let className = undefined
</script>

<div
	class="fade-up {className ?? ''}"
	class:translate-y-[1.5vh]={!showing}
	class:opacity-0={!showing}
	style="--delay: {delay}ms"
>
	<slot />
</div>

<style>
.fade-up {
	transition:
		transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
		opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition-delay: var(--delay, 0ms);
}
</style>
