<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

export let href = '/'
</script>

<a {href} class="inline-flex rounded-[1px] {FOCUS_OUTLINE} outline-offset-8">
	<span
		class="leading-trim block whitespace-nowrap font-sans text-base font-medium leading-6 md:text-xl md:leading-9"
	>
		<slot /> →
	</span>
</a>
