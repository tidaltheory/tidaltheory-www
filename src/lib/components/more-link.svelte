<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

export let href = '/'
</script>

<a
	sveltekit:prefetch
	{href}
	class="inline-flex rounded-[1px] {FOCUS_OUTLINE} outline-offset-8"
>
	<span
		class="block whitespace-nowrap font-medium font-sans text-base leading-6 leading-trim md:text-xl md:leading-9"
	>
		<slot /> →
	</span>
</a>
