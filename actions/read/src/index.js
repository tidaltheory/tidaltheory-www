import { readFile, writeFile } from 'node:fs/promises'

import { exportVariable, getInput, setFailed } from '@actions/core'
import * as github from '@actions/github'
import isbn from 'node-isbn'

import { checkBook } from './check-book.js'

/**
 * @typedef {'reading' | 'finished'} BookStatus
 */

/**
 * @typedef {Object} Payload
 * @property {string} isbn
 * @property {BookStatus} status
 * @property {string} [tags]
 */

/**
 * @typedef {Object} ActionInputs
 * @property {string} filename
 * @property {Array<string>} providers
 * @property {number} [thumbnail-width]
 */

export async function read() {
	try {
		/** @type {Payload} */
		let payload = github.context.payload.inputs

		validatePayload(payload)

		let { isbn: bookIsbn, tags, status } = payload

		// Set inputs.
		/** @type {string} */
		let filename = getInput('filename')
		/** @type {Array<string>} */
		let providers = getInput('providers')
			? getInput('providers').split(',')
			: isbn._providers
		let thumbnailWidth = getInput('thumbnail-width')
			? Number.parseInt(getInput('thumbnail-width'), 10)
			: undefined

		// Load existing data.
		let library = await readFromLibrary(filename)

		let bookParameters = {
			filename,
			bookIsbn,
			status,
			providers,
			thumbnailWidth,
			...(tags && { tags: tags.split(',').map((f) => f.trim()) }),
		}

		let bookExists = checkLibrary(library, bookIsbn)

		if (bookExists) {
			library = library.map((book) => {
				if (book.isbn === bookIsbn) {
					exportVariable('BookTitle', book.title)
					book = {
						...book,
						status: bookParameters.status,
					}
				}

				return book
			})
		} else {
			let newBook = await isbn
				.provider(providers)
				.resolve(bookIsbn)
				.catch((error) => {
					throw new Error(`Book (${bookIsbn}) not found. ${error.message}`)
				})

			newBook = checkBook(newBook, {
				bookIsbn,
				status,
				thumbnailWidth,
			})
			library.push(newBook)
			exportVariable('BookTitle', newBook.title)

			if (newBook.thumbnail) {
				exportVariable(`BookThumbOutput`, `book-${newBook.isbn}.png`)
				exportVariable(`BookThumb`, newBook.thumbnail)
			}
		}

		exportVariable('BookStatus', status)

		// Return the last (most recent) four entries.
		library = library.slice(-4)

		await writeLibrary(filename, library)
	} catch (error) {
		setFailed(error)
	}
}

await read()

function validatePayload(payload) {
	if (!payload) setFailed('Payload inputs not provided.')

	if (!payload.isbn) {
		setFailed('Missing `isbn` in payload.')
	}

	if (
		!payload.status ||
		(payload.status !== 'reading' && payload.status !== 'finished')
	) {
		setFailed('Invalid `status` in payload.')
	}
}

/**
 * @returns {Array<unknown>}
 */
async function readFromLibrary(filename) {
	try {
		let contents = await readFile(filename, 'utf8')
		if (contents === '' || !contents) return []
		return JSON.parse(contents)
	} catch (error) {
		throw new Error(error)
	}
}

function checkLibrary(library, isbn) {
	if (library === undefined || library.length === 0) return false
	if (library.filter((book) => book.isbn === isbn).length === 0) return false
	return true
}

/**
 * @param {string} filename
 * @param {Array<unknown>} library
 */
async function writeLibrary(filename, library) {
	try {
		await writeFile(filename, JSON.stringify(library, null, 2))
	} catch (error) {
		throw new Error(error)
	}
}
