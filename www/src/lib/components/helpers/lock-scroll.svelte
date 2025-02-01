<script>
import { onMount } from 'svelte'

onMount(() => {
	const { body, documentElement: html } = document
	const scrollBarWidth = window.innerWidth - html.clientWidth
	const bodyPaddingRight =
		Number.parseInt(
			globalThis.getComputedStyle(body).getPropertyValue('padding-right'),
			10,
		) || 0
	const { scrollY } = globalThis

	/**
	 * 1. Fixes a bug in iOS and desktop Safari where setting `overflow: hidden`
	 *    on html/body does not prevent scrolling.
	 * 2. Fixes a bug in desktop Safari where `overflow-y` does not prevent
	 *    scroll if `overflow-x` is also applied to the body.
	 */
	html.style.position = 'relative' // [1]
	html.style.overflow = 'hidden' // [2]
	body.style.position = 'relative' // [1]
	body.style.overflow = 'hidden' // [2]
	body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`
	body.style.top = `-${scrollY}px`

	return () => {
		html.style.position = ''
		html.style.overflow = ''
		body.style.position = ''
		body.style.overflow = ''
		body.style.paddingRight = ''
		body.style.top = ''
		window.scrollTo(0, scrollY)
	}
})
</script>

<slot />
