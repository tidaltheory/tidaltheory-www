import { exportVariable, getInput, warning } from '@actions/core'

export function checkBook(book, { bookIsbn, status, thumbnailWidth }) {
	checkMetadata(book, bookIsbn)

	return {
		isbn: bookIsbn,
		title: book.title ?? undefined,
		authors: book.authors ?? undefined,
		status,
		thumbnail: getThumbnailUrl(book.imageLinks.thumbnail, thumbnailWidth),
		link: book.canonicalVolumeLink ?? undefined,
	}
}

/**
 * Check for required metadata values.
 *
 * @param {*} book
 * @param {string} isbn
 */
function checkMetadata(book, isbn) {
	let requiredMetadata = new Set(
		getInput('required-metadata')
			.split(',')
			.map((string) => string.trim()),
	)
	let missingMetadata = []

	if (!book.title && requiredMetadata.has('title')) {
		missingMetadata.push('title')
	}

	let hasAuthors = !book.authors || book.authors.length === 0
	if (hasAuthors && requiredMetadata.has('authors')) {
		missingMetadata.push('authors')
	}

	if (!book.imageLinks?.thumbnail && requiredMetadata.includes('thumbnail')) {
		missingMetadata.push('thumbnail')
	}

	if (missingMetadata.length > 0) {
		warning(`Book does not have ${missingMetadata.join(', ')}`)
		exportVariable('BookNeedsReview', true)
		exportVariable('BookMissingMetadata', missingMetadata.join(', '))
		exportVariable('BookIsbn', isbn)
	}
}

/**
 * Return thumbnail image URL at desired width.
 *
 * @param {string} [thumbnail]
 * @param {number} [width]
 */
function getThumbnailUrl(thumbnail, width) {
	if (!thumbnail) return undefined

	if (thumbnail.startsWith('http:')) {
		thumbnail = thumbnail.replace('http:', 'https:')
	}

	let url = new URL(thumbnail)

	if (url.host === 'books.google.com' && width) {
		thumbnail = `${thumbnail}&w=${width}`.replace('&edge=curl', '')
	}

	return thumbnail
}
