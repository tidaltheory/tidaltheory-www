<script>
/** @type {import('@portabletext/svelte').CustomBlockComponentProps} */
export let portableText

$: ({ value } = portableText)
</script>

<figure class="m-0 my-[2em]">
	<pre class="p-4"><code class="language-{value.language}">{value.code}</code
		></pre>
</figure>
