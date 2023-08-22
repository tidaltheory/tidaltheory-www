import { linear } from 'svelte/easing'

/**
 * @typedef {object} TransitionOptions
 * @prop {number} [delay]
 * @prop {number} duration
 * @prop {string} base
 * @prop {string} [from]
 * @prop {string} [to]
 */

/**
 * @param {Element} node
 * @param {TransitionOptions} options
 * @returns {import('svelte/transition').TransitionConfig}
 */
export function classes(node, { delay, duration, base, from, to }) {
	const baseClasses = base ? base.split(' ') : []
	const fromClasses = from ? from.split(' ') : []
	const toClasses = to ? to.split(' ') : []

	if (baseClasses.length > 0 || fromClasses.length > 0) {
		node.classList.add(...baseClasses, ...fromClasses)
	}

	let updated = false
	let completed = false

	return {
		delay,
		duration,
		easing: linear,
		tick(t) {
			const isStart = t !== 1 && t !== 0 && !updated
			const isEnd = (t === 1 || t === 0) && updated && !completed

			if (isStart) {
				updated = true
				if (fromClasses.length > 0) {
					node.classList.remove(...fromClasses)
				}

				if (toClasses.length > 0) {
					node.classList.add(...toClasses)
				}
			}

			if (isEnd) {
				completed = true
				if (baseClasses.length > 0) {
					node.classList.remove(...baseClasses)
				}
			}
		},
	}
}
