/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	reportUnusedDisableDirectives: true,
	extends: ['@zazen', 'plugin:svelte/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		extraFileExtensions: ['.svelte'],
	},
	env: { browser: true },
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
		'import/order': [
			'error',
			{
				alphabetize: {
					caseInsensitive: true,
					order: 'asc',
				},
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					['sibling', 'index'],
				],
				'newlines-between': 'always',
				pathGroups: [
					{
						pattern:
							'{@sveltejs/**,svelte/**,svelte?(-preprocess)}',
						group: 'builtin',
						position: 'after',
					},
					{
						pattern: '$?(app|lib)/**',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '*.+(css)',
						group: 'index',
						position: 'after',
						patternOptions: {
							matchBase: true,
						},
					},
				],
				pathGroupsExcludedImportTypes: ['svelte'],
			},
		],

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
			},
		},
		{ files: ['*.cjs'], env: { node: true } },
		{
			files: ['*.ts', '*.tsx'],
			extends: ['@zazen/eslint-config/typescript'],
			parserOptions: {
				project: './studio/tsconfig.json',
			},
			rules: {
				'import/extensions': ['off'],
			},
		},
	],
}

module.exports = config
