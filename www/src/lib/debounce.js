/**
 * @param {Function} function_
 * @param {number} delay
 * @param {{ leading?: boolean }} [options]
 * @returns {Function}
 */
export function debounce(function_, delay, { leading } = {}) {
	let timerId
	let shouldInvoke

	return (...args) => {
		shouldInvoke = true

		if (!timerId && leading) {
			function_(...args)
			shouldInvoke = false
		}

		clearTimeout(timerId)

		timerId = setTimeout(() => shouldInvoke && function_(...args), delay)
	}
}
