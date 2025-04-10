<script>
import { onMount } from 'svelte'

import { beforeNavigate } from '$app/navigation'
import { FOCUS_OUTLINE } from '$lib/classnames'

import FaviconBluesky from './icons/favicon-bluesky.svelte'
import FaviconLinkedin from './icons/favicon-linkedin.svelte'
import SiteNavItem from './site-nav-item.svelte'
import SiteNavLogo from './site-nav-logo.svelte'

/** @type {HTMLDialogElement} */
let menu = $state()

onMount(() => {
	menu.addEventListener('click', (event) => {
		let dialog = /** @type {HTMLDialogElement} */ (event.target)
		if (dialog.nodeName === 'DIALOG') dialog.close('dismiss')
	})
})

beforeNavigate(async () => {
	menu.close()
})
</script>

<div class="nav bg-grey-900 md:bg-opacity-0">
	<a class="rounded text-cyan-400 {FOCUS_OUTLINE}" href="/" aria-label="Home"
		><SiteNavLogo /></a
	>
	<span class="span">———</span>
	<button
		class="menu-button rounded border-none bg-transparent p-0 {FOCUS_OUTLINE}"
		onclick={() => menu.showModal()}
	>
		<span class="text-base">Menu</span>
	</button>
</div>

<dialog id="menu" bind:this={menu}>
	<nav class="flex w-full flex-col gap-10 p-8 backdrop-blur md:gap-20 md:pl-20">
		<div class="flex flex-col items-start gap-6">
			<SiteNavItem main href="/about/">About</SiteNavItem>
			<SiteNavItem main href="/work/">Work</SiteNavItem>
			<SiteNavItem main href="/photos/">Photos</SiteNavItem>
			<SiteNavItem main href="/writing/">Writing</SiteNavItem>
		</div>
		<div class="flex flex-col items-start gap-3">
			<SiteNavItem href="/projects/">Projects</SiteNavItem>
			<SiteNavItem href="/notes/">Notes</SiteNavItem>
			<!-- <SiteNavItem href="/uses/">Uses</SiteNavItem> -->
			<!-- <SiteNavItem href="/colophon/">Colophon</SiteNavItem> -->
			<!-- <SiteNavItem href="/rss/">RSS Feeds</SiteNavItem> -->
		</div>
		<div class="flex flex-wrap items-start gap-4">
			<a
				class="flex text-3xl text-white"
				href="https://bsky.app/profile/tidaltheory.io"
				aria-label="Bluesky"><FaviconBluesky /></a
			>
			<a
				class="flex text-3xl text-white"
				href="https://github.com/stormwarning"
				aria-label="GitHub"
				><svg
					viewBox="0 0 24 24"
					fill="none"
					class="h-[1cap] w-[1cap] self-center"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C17.1727 20.8173 18.8977 19.5415 20.1198 17.8395C21.3419 16.1376 21.9995 14.0953 22 12C22 6.475 17.525 2 12 2Z"
						fill="currentColor"
					/>
				</svg>
			</a>
			<a
				class="flex text-3xl text-white"
				href="https://www.linkedin.com/in/jxff/"
				aria-label="LinkedIn"><FaviconLinkedin /></a
			>
		</div>
	</nav>
</dialog>

<style>
.nav {
	position: fixed;
	top: 0;
	z-index: 50;
	inline-size: 100vw;
	display: flex;
	align-items: center;
	gap: 24px;
	padding-inline: 2rem;
	padding-block: 1rem;

	@media (min-width: 768px) {
		flex-direction: column;
		inline-size: auto;
		padding: 1.5rem;
		padding-block-start: calc(11svb + 1.5rem);
	}
}

.span {
	pointer-events: none;

	@media (min-width: 768px) {
		writing-mode: sideways-lr;
		text-orientation: sideways;

		@supports not (writing-mode: sideways-lr) {
			writing-mode: vertical-lr;
			rotate: 180deg;
		}
	}
}

.menu-button {
	padding: 0.5rem;
	text-transform: uppercase;

	&:hover,
	&:focus-visible {
		background-color: theme('colors.grey.600');
	}

	/**
	 * 1. Safari doesn't support `sideways-lr`.
	 */
	@media (min-width: 768px) {
		writing-mode: sideways-lr; /* [1] */
		text-orientation: sideways;

		@supports not (writing-mode: sideways-lr) {
			writing-mode: vertical-lr;
			rotate: 180deg;
		}
	}

	& span::before,
	& span::after {
		display: table;
		content: '';
	}

	/**
	 * @todo Remove this after tailwindcss-capsize outputs logical properties.
	 */
	& span::before {
		margin-block-end: calc(
			(
					(
							var(--ascent-scale) - var(--cap-height-scale) +
								var(--line-gap-scale) / 2
						) -
						var(--line-height-offset)
				) *
				-1em
		);
	}

	& span::after {
		margin-block-start: calc(
			(
					(var(--descent-scale) + var(--line-gap-scale) / 2) -
						var(--line-height-offset)
				) *
				-1em
		);
	}
}

dialog {
	--_duration: 400ms;
	--_inset: 1rem;

	block-size: 100dvh;
	max-block-size: 100%;
	inline-size: min(45ch, 80vw);
	padding: var(--_inset);
	margin: 0;
	margin-inline-start: auto;
	background: none;
	box-shadow: none;
	transition:
		display var(--_duration) allow-discrete,
		overlay var(--_duration) allow-discrete;

	@media (min-width: 768px) {
		margin-inline-start: 0;
		margin-inline-end: auto;
	}

	&::backdrop {
		background-color: #0008;
		opacity: 0;
		transition: opacity var(--_duration) ease;
	}

	& > nav {
		background-color: theme('colors.grey.800');
		border-radius: 0.25rem;
		transition: 200ms ease-in;

		@media (min-width: 768px) {
			block-size: 100%;
			padding-block-start: calc(11svb + 1.5rem);
		}

		@media (prefers-reduced-motion: no-preference) {
			transition-property: opacity, translate;
			translate: 0 calc((100% + var(--_inset)) * -1);

			@media (min-width: 768px) {
				translate: calc((100% + var(--_inset)) * -1) 0;
			}
		}

		@media (prefers-reduced-motion: reduce) {
			opacity: 0;
			transition-property: opacity;
		}
	}

	&[open] {
		&,
		&::backdrop {
			opacity: 1;
		}

		& > nav {
			opacity: 1;
			translate: 0;
			/* transition-duration: var(--_duration);
					transition-timing-function: ease-out; */
		}
	}

	@starting-style {
		&[open],
		&[open]::backdrop {
			opacity: 0;
		}
		&[open] > nav {
			opacity: 0;
			translate: 0 calc((100% + var(--_inset)) * -1);

			@media (min-width: 768px) {
				translate: calc((100% + var(--_inset)) * -1) 0;
			}
		}
	}
}
</style>
