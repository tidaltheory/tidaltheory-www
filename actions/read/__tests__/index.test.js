/* eslint-disable no-import-assign */

import { readFile, writeFile } from 'node:fs/promises'

import * as core from '@actions/core'
import * as github from '@actions/github'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { read } from '../src/index.js'

const FILE_CONTENTS = JSON.stringify([
	{
		isbn: '9781534431010',
		title: 'This Is How You Lose the Time War',
		authors: ['Amal El-Mohtar', 'Max Gladstone'],
		status: 'reading',
		thumbnail:
			'https://books.google.com/books/content?id=8EyBDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		link: 'https://play.google.com/store/books/details?id=8EyBDwAAQBAJ',
	},
])

const DEFAULT_OPTIONS = {
	filename: 'my-library.json',
	'required-metadata': 'title,authors',
	'time-zone': 'America/New_York',
}

vi.mock('fs/promises')
vi.mock('@actions/core', () => ({
	setFailed: vi.fn(),
	exportVariable: vi.fn(),
	getInput: vi.fn(),
	warning: vi.fn(),
	summary: {
		addRaw: () => ({
			write: vi.fn(),
		}),
	},
}))

describe('action', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	beforeEach(() => {
		readFile.mockImplementation(() => FILE_CONTENTS)
		vi.spyOn(core, 'getInput').mockImplementation(
			(v) => DEFAULT_OPTIONS[v] || undefined,
		)
	})

	it('adds a book to the reading list', async () => {
		const exportVariableSpy = vi.spyOn(core, 'exportVariable')
		const setFailedSpy = vi.spyOn(core, 'setFailed')

		Object.defineProperty(github, 'context', {
			value: {
				payload: {
					inputs: {
						isbn: '9781338167016',
						status: 'reading',
					},
				},
			},
		})

		await read()

		expect(setFailedSpy).not.toHaveBeenCalled()
		expect(exportVariableSpy.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "BookTitle",
			    "The Girl who Drank the Moon",
			  ],
			  [
			    "BookThumbOutput",
			    "book-9781338167016.png",
			  ],
			  [
			    "BookThumb",
			    "https://books.google.com/books/content?id=RvXXswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
			  ],
			  [
			    "BookStatus",
			    "reading",
			  ],
			]
		`)
		expect(writeFile.mock.calls[0]).toMatchInlineSnapshot(`
			[
			  "my-library.json",
			  "[
			  {
			    "isbn": "9781534431010",
			    "title": "This Is How You Lose the Time War",
			    "authors": [
			      "Amal El-Mohtar",
			      "Max Gladstone"
			    ],
			    "status": "reading",
			    "thumbnail": "https://books.google.com/books/content?id=8EyBDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
			    "link": "https://play.google.com/store/books/details?id=8EyBDwAAQBAJ"
			  },
			  {
			    "isbn": "9781338167016",
			    "title": "The Girl who Drank the Moon",
			    "authors": [
			      "Kelly Regan Barnhill"
			    ],
			    "status": "reading",
			    "thumbnail": "https://books.google.com/books/content?id=RvXXswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
			    "link": "https://books.google.com/books/about/The_Girl_who_Drank_the_Moon.html?hl=&id=RvXXswEACAAJ"
			  }
			]",
			]
		`)
	})

	it('updates openlibrary.org thumbnail paths', async () => {
		const exportVariableSpy = vi.spyOn(core, 'exportVariable')
		const setFailedSpy = vi.spyOn(core, 'setFailed')

		Object.defineProperty(github, 'context', {
			value: {
				payload: {
					inputs: {
						isbn: '9781101138182',
						status: 'reading',
					},
				},
			},
		})

		await read()

		expect(setFailedSpy).not.toHaveBeenCalled()
		expect(exportVariableSpy.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "BookTitle",
			    "The Long Walk",
			  ],
			  [
			    "BookThumbOutput",
			    "book-9781101138182.png",
			  ],
			  [
			    "BookThumb",
			    "https://covers.openlibrary.org/b/id/6397695-L.jpg",
			  ],
			  [
			    "BookStatus",
			    "reading",
			  ],
			]
		`)
		expect(writeFile.mock.calls[0]).toMatchInlineSnapshot(`
			[
			  "my-library.json",
			  "[
			  {
			    "isbn": "9781534431010",
			    "title": "This Is How You Lose the Time War",
			    "authors": [
			      "Amal El-Mohtar",
			      "Max Gladstone"
			    ],
			    "status": "reading",
			    "thumbnail": "https://books.google.com/books/content?id=8EyBDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
			    "link": "https://play.google.com/store/books/details?id=8EyBDwAAQBAJ"
			  },
			  {
			    "isbn": "9781101138182",
			    "title": "The Long Walk",
			    "authors": [
			      "Stephen King"
			    ],
			    "status": "reading",
			    "thumbnail": "https://covers.openlibrary.org/b/id/6397695-L.jpg"
			  }
			]",
			]
		`)
	})

	it('updates an existing book', async () => {
		const exportVariableSpy = vi.spyOn(core, 'exportVariable')
		const setFailedSpy = vi.spyOn(core, 'setFailed')

		Object.defineProperty(github, 'context', {
			value: {
				payload: {
					inputs: {
						isbn: '9781534431010',
						status: 'finished',
					},
				},
			},
		})

		await read()

		expect(setFailedSpy).not.toHaveBeenCalled()
		expect(exportVariableSpy.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "BookTitle",
			    "This Is How You Lose the Time War",
			  ],
			  [
			    "BookStatus",
			    "finished",
			  ],
			]
		`)
		expect(writeFile.mock.calls[0]).toMatchInlineSnapshot(`
			[
			  "my-library.json",
			  "[
			  {
			    "isbn": "9781534431010",
			    "title": "This Is How You Lose the Time War",
			    "authors": [
			      "Amal El-Mohtar",
			      "Max Gladstone"
			    ],
			    "status": "finished",
			    "thumbnail": "https://books.google.com/books/content?id=8EyBDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
			    "link": "https://play.google.com/store/books/details?id=8EyBDwAAQBAJ"
			  }
			]",
			]
		`)
	})
})
