<script>
import { FOCUS_OUTLINE } from '$lib/classnames'
import { urlFor } from '$lib/sanity/image'

import IconDocumentAdd from './icons/icon-document-add.svelte'
import IconPhoto from './icons/icon-photo.svelte'
import PortableText from './portable-text.svelte'
import RelativeDate from './relative-date.svelte'

const iconMap = {
	'gallery-add': IconPhoto,
	'gallery-update': IconPhoto,
	'post-add': IconDocumentAdd,
	'note-add': IconDocumentAdd,
}

/**
 * @typedef {Object} Props
 * @property {import('$lib/sanity/types.js').UpdateQueryResult[number]} update
 */

/** @type {Props} */
let { update } = $props()

let { type, date, id, slug, title, count, excerpt, images } = $derived(update)
let hasPreview = $derived(
	['gallery-add', 'post-add', 'note-add'].includes(type),
)

/** @type {HTMLElement} */
let card = $state()
/** @type {HTMLAnchorElement} */
let link = $state()

/** @param {MouseEvent} event */
function handleCardPress(event) {
	if (type === 'note-add') return false
	if (event.target !== link) link.click()
}

const SvelteComponent = $derived(iconMap[type])
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<article
	class="salt group relative grid grid-cols-[36px_1fr_auto] gap-2 rounded-[1px] font-sans {FOCUS_OUTLINE} outline-offset-8"
	class:cursor-pointer={type !== 'note-add'}
	class:focus-within:outline={type !== 'note-add'}
	bind:this={card}
	role="link"
	onclick={handleCardPress}
>
	<div
		class="bg-grey-700 absolute -inset-2 -z-10 rounded-md bg-opacity-0 transition"
		class:group-hover:bg-opacity-20={type !== 'note-add'}
	></div>
	<div
		class="bg-grey-700 flex h-9 w-9 items-center justify-center rounded-full text-white"
	>
		<SvelteComponent />
	</div>
	<div class="py-3">
		<p class="text-grey-400 leading-trim text-base">
			{#if type === 'gallery-add'}
				Added a gallery of <a
					class="font-medium text-white underline decoration-[transparent] decoration-[0.0781em] underline-offset-[calc(0.0781em_*_2)] outline-none transition group-hover:decoration-white"
					bind:this={link}
					href="/photos/{slug}/">{title}</a
				> images
			{:else if type === 'gallery-update'}
				Added {count} images to the
				<a
					class="font-medium text-white underline decoration-[transparent] decoration-[0.0781em] underline-offset-[calc(0.0781em_*_2)] outline-none transition group-hover:decoration-white"
					bind:this={link}
					href="/photos/{slug}/">{title}</a
				> gallery
			{:else if type === 'post-add'}
				Published a post
			{:else if type === 'note-add'}
				Published a new note
			{/if}
		</p>
	</div>
	<div class="text-grey-400 flex h-9 items-center">
		{#if type === 'note-add'}
			<a
				class="rounded-[1px] underline decoration-[transparent] decoration-[0.0781em] underline-offset-[calc(0.0781em_*_2)] transition hover:decoration-[inherit] {FOCUS_OUTLINE}"
				bind:this={link}
				href="/notes/{slug}/"
			>
				<RelativeDate {date} />
			</a>
		{:else}
			<RelativeDate {date} />
		{/if}
	</div>
	{#if hasPreview}
		<div class="col-span-2 col-start-2">
			{#if type === 'gallery-add'}
				<div class="flex gap-2 overflow-x-auto">
					{#each images as image}
						<div class="flex h-20 w-20 flex-none">
							<img
								class="h-full w-full rounded-[1px] object-cover"
								src={urlFor(image.image)
									.width(80)
									.height(80)
									.format('webp')
									.url()}
								alt=""
							/>
						</div>
					{/each}
				</div>
			{:else if type === 'post-add'}
				<div class="grid gap-6 py-2">
					<h4
						class="font-display leading-trim max-w-[45ch] text-xl uppercase md:text-2xl"
					>
						<a
							class="outline-none"
							aria-labelledby={id}
							href="/writing/{slug}/"
							bind:this={link}
						>
							{title}
						</a>
					</h4>
					<p class="text-grey-300 leading-trim salt max-w-[65ch]">
						{excerpt}
					</p>
					<footer>
						<span
							class="font-medium text-white underline decoration-[transparent] decoration-[0.0781em] underline-offset-[calc(0.0781em_*_2)] transition group-hover:decoration-white"
							{id}
						>
							<span aria-hidden="true">↳</span> Read post
						</span>
					</footer>
				</div>
			{:else if type === 'note-add'}
				<div class="grid gap-6 py-2">
					<section
						class="prose prose-invert text-grey-300 leading-trim salt max-w-[65ch]"
					>
						<PortableText value={excerpt} />
					</section>
				</div>
			{/if}
		</div>
	{/if}
</article>
