<script>
import IconButton from './icon-button.svelte'

/** @type {string} */
export let id
/** @type {import('@tidaltheory/lens').ImageMeta} */
export let meta

$: expanded = false

function toggleExpanded() {
	expanded = !expanded
}
</script>

<div class="">
	<div class="absolute bottom-2 left-2 z-10 flex md:bottom-3 md:left-3">
		<div
			class="flex opacity-40 transition focus-within:opacity-100 group-hover:opacity-100"
			class:opacity-100={expanded}
		>
			<IconButton
				aria-controls={id}
				aria-expanded={expanded}
				on:click={toggleExpanded}
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
					/>
				</svg>
			</IconButton>
		</div>
	</div>
	<div
		class="grid gap-4 bg-grey-900 bg-opacity-60 py-5 pr-5 pl-12 text-white backdrop-blur-sm md:py-[22px] md:pr-6 md:pl-14"
		class:hidden={!expanded}
		{id}
	>
		{#if meta.title}
			<span
				class="text-sm font-semibold font-sans leading-5 leading-trim md:text-base md:leading-6"
			>
				{meta.title}
			</span>
		{/if}
		{#if meta.caption}
			<span
				class="text-sm font-sans leading-5 leading-trim md:text-base md:leading-6"
				>{meta.caption}</span
			>
		{/if}
	</div>
</div>
