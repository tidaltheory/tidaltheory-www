import { writable } from 'svelte/store'

/** @typedef {{ classNames: string, sm?: boolean, md?: boolean, lg?: boolean, xl?: boolean }} MediaState */

/**
 * @param {Record<string, MediaQueryList>} mqls
 * @returns {MediaState}
 */
function calculateMedia(mqls) {
	/** @type {MediaState} */
	let media = { classNames: '' }
	let mediaClasses = []

	for (let name of Object.keys(mqls)) {
		media[name] = mqls[name].matches
		if (media[name]) {
			mediaClasses.push(`media-${name}`)
		}
	}

	media.classNames = mediaClasses.join(' ')

	return media
}

/**
 * @param {Record<string, string>} mediaqueries
 * @returns {import('svelte/store').Writable<MediaState>}
 */
function watchMedia(mediaqueries) {
	return writable({ classNames: '' }, (set) => {
		if (typeof globalThis === 'undefined') return
		if (typeof globalThis.matchMedia !== 'function') return

		let mqls = {}
		let updateMedia = () => set(calculateMedia(mqls))

		for (let key of Object.keys(mediaqueries)) {
			let foo = globalThis.matchMedia(mediaqueries[key])
			mqls[key] = foo
			mqls[key].addListener(updateMedia)
		}

		updateMedia()

		return () => {
			for (let key of Object.keys(mqls)) {
				mqls[key].removeListener(updateMedia)
			}
		}
	})
}

export const media = watchMedia({
	sm: '(max-width: 767px)',
	md: '(min-width: 768px)',
	lg: '(min-width: 1024px)',
	xl: '(min-width: 1280px)',
})
