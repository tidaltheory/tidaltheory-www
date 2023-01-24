<script>
import { FOCUS_OUTLINE } from '$lib/classnames'

import IconDocumentAdd from './icons/icon-document-add.svelte'
import IconPhoto from './icons/icon-photo.svelte'

export let update

$: ({ _type, date, slug, title, count, excerpt, images } = update)
$: hasPreview = ['gallery-add', 'post-add'].includes(_type)
</script>

<article
	class="group relative grid grid-cols-[36px_1fr_auto] gap-2 rounded-[1px] font-sans salt ss-02 {FOCUS_OUTLINE} focus-within:outline"
>
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
					class="font-medium text-white outline-none before:absolute before:inset-0 group-hover:underline"
					style="text-decoration-thickness:1.5px"
					href="/photos/{slug}/">{title}</a
				> images
			{:else if _type === 'gallery-update'}
				Added {count} images to the
				<a
					class="font-medium text-white outline-none before:absolute before:inset-0 group-hover:underline"
					style="text-decoration-thickness:1.5px"
					href="/photos/{slug}/">{title}</a
				> gallery
			{:else if _type === 'post-add'}
				Published a post
			{/if}
		</p>
	</div>
	<div class="flex h-9 items-center">
		<time class="text-grey-400 text-xs" datetime={date}>{date}</time>
	</div>
	{#if hasPreview}
		<div class="col-[2]">
			{#if _type === 'gallery-add'}
				<div class="flex gap-2">
					{#each images as image}
						<div class="flex h-20 w-20">
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
						class="uppercase font-display text-xl leading-trim md:text-2xl"
					>
						<a
							class="outline-none before:absolute before:inset-0"
							href="/writing/{slug}/"
						>
							{title}
						</a>
					</h4>
					<p class="text-grey-300 leading-trim salt">{excerpt}</p>
					<footer>
						<span
							class="font-medium text-white group-hover:underline"
							style="text-decoration-thickness:1.5px"
						>
							Read post →
						</span>
					</footer>
				</div>
			{/if}
		</div>
	{/if}
</article>
