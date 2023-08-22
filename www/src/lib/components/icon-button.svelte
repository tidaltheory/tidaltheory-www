<script>
import { FOCUS_OUTLINE } from '$lib/classnames'
</script>

<button
	class="m-0 rounded border-0 bg-grey-900 bg-opacity-0 p-1 text-white hover:bg-opacity-50 {FOCUS_OUTLINE}"
	type="button"
	on:click
	{...$$restProps}
>
	<slot />
</button>
