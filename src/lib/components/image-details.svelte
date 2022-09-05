<script>
export let id

$: expanded = false

function toggleExpanded() {
	expanded = !expanded
}
</script>

<div class="">
	<div class="absolute bottom-3 left-3 flex">
		<button
			class="m-0 rounded border-0 bg-grey-900 bg-opacity-0 p-1 text-white hover:bg-opacity-50"
			type="button"
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
		</button>
	</div>
	<div
		class="bg-grey-900 bg-opacity-60 py-[22px] pr-6 pl-14 text-white"
		class:hidden={!expanded}
		{id}
	>
		<span class="font-semibold font-sans text-base leading-6 leading-trim">
			<slot />
		</span>
	</div>
</div>
