/**
 * @param {Element} t
 */
function wrapWords(t) {
	// Add whitespace after break tags and split words.
	let text = t.innerHTML
		.replace('<br>', '<br> ')
		.split(/\s/)
		.filter((string) => string !== '')
	let markup = ''

	if (text.length > 0) {
		for (const [index, word] of text.entries()) {
			const hardBreak = word.endsWith('<br>')

			if (index > 0) markup += ' '
			markup += `<span class="line">${word.replace('<br>', '')}</span>`
			if (hardBreak) markup += '<br>'

			continue
		}

		t.innerHTML = markup
	}
}

/**
 * Wrap each line of the heading in a `span` in order to stagger the reveal
 * transition styles.
 *
 * @param {Element} element
 */
export function wrapLines(element) {
	if (element) {
		wrapWords(element)

		let { children } = element
		let lastTop = 0
		let markup = ''
		/** @type {Array<string>} */
		let lineWords = []
		let lineNumber = 1
		let lineClass = `class="line inline-block will-change-transform"`

		for (const [index, child] of [...children].entries()) {
			let { top } = child.getBoundingClientRect()
			let newTop = Math.round(top)

			if (index === 0) lastTop = newTop
			if (child.nodeName === 'BR') newTop++

			if (newTop > lastTop) {
				if (lineWords.length > 0) {
					markup += `<span ${lineClass} style="--delay: ${
						100 * lineNumber
					}ms">${lineWords.join(' ')}</span>`
				}

				lastTop = newTop
				lineWords = []
				if (child.nodeName !== 'BR') lineNumber++
				if (child.nodeName === 'BR') markup += '<br>'
			}

			if (child.textContent) lineWords.push(child.textContent)
			if (0 < index && child.nodeName !== 'BR') markup += ' '

			if (index === children.length - 1 && lineWords.length > 0) {
				markup += `<span ${lineClass} style="--delay: ${
					100 * lineNumber
				}ms">${lineWords.join(' ')}</span>`
			}
		}

		/**
		 * Replace the dummy span with the good markup. (Dummy span required
		 * to make Safari work)
		 */
		if (element.parentElement) element.parentElement.innerHTML = markup
	}
}

/**
 * Remove wrapping `span` elements.
 * @param {Element} element
 */
export function unwrapLines(element) {
	/** @type {Array<string>} */
	let markup = []
	for (const child of element.children) {
		markup.push(
			child.nodeName === 'SPAN' ? child.innerHTML : child.outerHTML,
		)
	}

	element.innerHTML = markup.join(' ')
}
