/**
 * @template {(...args: unknown[]) => unknown} T
 * @param {T} function_ - The function to debounce
 * @param {number} [delay=0] - The number of milliseconds to delay
 * @param {Object} [options={}] - Additional options for debouncing
 * @param {boolean} [options.leading=false] - Specify invoking on the leading edge of the timeout
 * @returns {(...args: Parameters<T>) => ReturnType<T>} A debounced version of the original function
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
