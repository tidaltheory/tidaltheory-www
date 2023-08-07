<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import IconDocumentAdd from './icons/icon-document-add.svelte'
import IconPhoto from './icons/icon-photo.svelte'
import RelativeDate from './relative-date.svelte'

/**
 * @typedef {object} Update
 * @prop {keyof typeof iconMap} _type
 * @prop {string} date
 * @prop {string} id
 * @prop {string} slug
 * @prop {string} title
 * @prop {number} count
 * @prop {string} excerpt
 * @prop {import('@tidaltheory/lens').ImageRecord[]} images
 */

const iconMap = {
	'gallery-add': IconPhoto,
	'gallery-update': IconPhoto,
	'post-add': IconDocumentAdd,
	'note-add': IconDocumentAdd,
}

/** @type {Update} */
export let update

$: ({ _type, date, id, slug, title, count, excerpt, images } = update)
$: hasPreview = ['gallery-add', 'post-add', 'note-add'].includes(_type)

/** @type {HTMLElement} */
let card
/** @type {HTMLAnchorElement} */
let link

/** @param {MouseEvent} event */
function handleCardPress(event) {
	if (_type === 'note-add') return false
	if (event.target !== link) link.click()
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<article
	class="group relative grid grid-cols-[36px_1fr_auto] gap-2 rounded-[1px] font-sans salt {FOCUS_OUTLINE} outline-offset-8"
	class:cursor-pointer={_type !== 'note-add'}
	class:focus-within:outline={_type !== 'note-add'}
	bind:this={card}
	role="link"
	on:click={handleCardPress}
>
	<div
		class="absolute -inset-2 -z-10 rounded-md bg-grey-700 bg-opacity-0 transition"
		class:group-hover:bg-opacity-20={_type !== 'note-add'}
	/>
	<div
		class="flex h-9 w-9 items-center justify-center rounded-full bg-grey-700 text-white"
	>
		<svelte:component this={iconMap[_type]} />
	</div>
	<div class="py-3">
		<p class="text-grey-400 text-base leading-trim">
			{#if _type === 'gallery-add'}
				Added a gallery of <a
					class="font-medium text-white underline decoration-[transparent] decoration-[0.0781em] outline-none transition group-hover:decoration-white"
					bind:this={link}
					href="/photos/{slug}/">{title}</a
				> images
			{:else if _type === 'gallery-update'}
				Added {count} images to the
				<a
					class="font-medium text-white underline decoration-[transparent] decoration-[0.0781em] outline-none transition group-hover:decoration-white"
					bind:this={link}
					href="/photos/{slug}/">{title}</a
				> gallery
			{:else if _type === 'post-add'}
				Published a post
			{:else if _type === 'note-add'}
				Published a new note
			{/if}
		</p>
	</div>
	<div class="flex h-9 items-center text-grey-400">
		{#if _type === 'note-add'}
			<a
				class="rounded-[1px] underline decoration-[transparent] decoration-[0.0781em] transition hover:decoration-[inherit] {FOCUS_OUTLINE}"
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
			{#if _type === 'gallery-add'}
				<div class="flex gap-2 overflow-x-auto">
					{#each images as image}
						<div class="flex h-20 w-20 flex-none">
							<img
								class="h-full w-full rounded-[1px] object-cover"
								src={image.thumbnails?.[
									'gallery-sm'
								].formats?.webp.replace(/^static/, '')}
								alt=""
							/>
						</div>
					{/each}
				</div>
			{:else if _type === 'post-add'}
				<div class="grid gap-6 py-2">
					<h4
						class="max-w-[45ch] uppercase font-display text-xl leading-trim md:text-2xl"
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
					<p class="max-w-[65ch] text-grey-300 leading-trim salt">
						{excerpt}
					</p>
					<footer>
						<span
							class="font-medium text-white underline decoration-[transparent] decoration-[0.0781em] transition group-hover:decoration-white"
							{id}
						>
							Read post <span aria-hidden>→</span>
						</span>
					</footer>
				</div>
			{:else if _type === 'note-add'}
				<div class="grid gap-6 py-2">
					<section
						class="prose prose-invert max-w-[65ch] text-grey-300 leading-trim salt"
					>
						{@html excerpt}
					</section>
				</div>
			{/if}
		</div>
	{/if}
</article>
