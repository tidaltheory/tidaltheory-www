const path = require('node:path')

/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	reportUnusedDisableDirectives: true,
	ignorePatterns: ['actions/**/dist', 'www/src/lib/sanity/types.ts'],
	extends: ['@zazen', 'plugin:svelte/recommended', 'prettier'],
	plugins: ['import-sorting'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		extraFileExtensions: ['.svelte'],
	},
	env: { browser: true },
	settings: {
		'import-sorting/framework-patterns': [
			/^@?portabletext(\/|$)/.source,
			/^@?sanity(\/|$)/.source,
			/^(@sveltejs|svelte(\/|-preprocess|$))/.source,
		],
		'import-sorting/internal-patterns': /^\$(app|lib)(\/|$)/.source,
	},
	rules: {
		/**
		 * Deprecated rule.
		 */
		'no-return-await': 'off',

		/**
		 * Explicitly initialising props variables to `undefined` lets Svelte
		 * know the props are optional.
		 */
		'no-undef-init': 'off',

		'import/no-extraneous-dependencies': 'off',
		'import/order': 'off',

		'prefer-let/prefer-let': 'off',

		'unicorn/switch-case-braces': ['error', 'avoid'],

		yoda: 'off',
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			rules: {
				'import/extensions': 'off',
				'import/no-mutable-exports': 'off',

				'svelte/no-at-html-tags': 'off',
				'svelte/no-dupe-style-properties': 'warn',
			},
		},
		{ files: ['*.cjs'], env: { node: true } },
		{
			files: ['*.ts', '*.tsx'],
			extends: ['@zazen/eslint-config/typescript'],
			parserOptions: {
				project: path.resolve('studio', 'tsconfig.json'),
			},
			rules: {
				'@typescript-eslint/ban-types': 'off',
				'@typescript-eslint/lines-between-class-members': 'off',
				'@typescript-eslint/padding-line-between-statements': 'off',

				'import/extensions': ['off'],
			},
		},
	],
}

module.exports = config
