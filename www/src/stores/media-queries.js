import { writable } from 'svelte/store'

/**
 * @param {Record<string, MediaQueryList>} mqls
 */
function calculateMedia(mqls) {
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

function watchMedia(mediaqueries) {
	return writable({ classNames: '' }, (set) => {
		if (typeof window === 'undefined') return

		let mqls = {}
		let updateMedia = () => set(calculateMedia(mqls))

		for (let key of Object.keys(mediaqueries)) {
			let foo = window.matchMedia(mediaqueries[key])
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
