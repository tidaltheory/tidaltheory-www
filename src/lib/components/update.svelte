<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import IconDocumentAdd from './icons/icon-document-add.svelte'
import IconPhoto from './icons/icon-photo.svelte'
import RelativeDate from './relative-date.svelte'

export let update

$: ({ _type, date, id, slug, title, count, excerpt, images } = update)
$: hasPreview = ['gallery-add', 'post-add'].includes(_type)

let card
let link
</script>

<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- eslint-disable-next-line svelte/valid-compile  -->
<article
	class="group relative grid cursor-pointer grid-cols-[36px_1fr_auto] gap-2 rounded-[1px] font-sans salt {FOCUS_OUTLINE} outline-offset-8 focus-within:outline"
	bind:this={card}
	on:click={(event) => (event.target === link ? {} : link.click())}
>
	<div
		class="absolute -inset-2 -z-10 rounded-md bg-grey-700 bg-opacity-0 transition group-hover:bg-opacity-20"
	/>
	<div
		class="flex h-9 w-9 items-center justify-center rounded-full bg-grey-700 text-white"
	>
		{#if _type.startsWith('gallery')}
			<IconPhoto />
		{:else if _type === 'post-add'}
			<IconDocumentAdd />
		{/if}
	</div>
	<div class="py-3">
		<p class="text-grey-400 text-base leading-trim">
			{#if _type === 'gallery-add'}
				Added a gallery of <a
					class="font-medium text-white underline decoration-[transparent] decoration-[1.5px] outline-none transition group-hover:decoration-white"
					bind:this={link}
					href="/photos/{slug}/">{title}</a
				> images
			{:else if _type === 'gallery-update'}
				Added {count} images to the
				<a
					class="font-medium text-white underline decoration-[transparent] decoration-[1.5px] outline-none transition group-hover:decoration-white"
					bind:this={link}
					href="/photos/{slug}/">{title}</a
				> gallery
			{:else if _type === 'post-add'}
				Published a post
			{/if}
		</p>
	</div>
	<div class="flex h-9 items-center">
		<RelativeDate {date} />
	</div>
	{#if hasPreview}
		<div class="col-span-2 col-start-2">
			{#if _type === 'gallery-add'}
				<div class="flex gap-2 overflow-x-auto">
					{#each images as image}
						<div class="flex h-20 w-20 flex-none">
							<img
								class="h-full w-full rounded-[1px] object-cover"
								src={image.thumbnails[
									'gallery-sm'
								].formats.webp.replace(/^static/, '')}
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
							class="font-medium text-white underline decoration-[transparent] decoration-[1.5px] transition group-hover:decoration-white"
							{id}
						>
							Read post <span aria-hidden>→</span>
						</span>
					</footer>
				</div>
			{/if}
		</div>
	{/if}
</article>
