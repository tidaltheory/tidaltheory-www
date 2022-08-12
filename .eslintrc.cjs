const config = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	env: { browser: true },
	rules: {},
	overrides: [
		{ files: ['*.svelte'], processor: 'svelte3/svelte3' },
		{ files: ['*.cjs'], env: { node: true } },
	],
}

module.exports = config
