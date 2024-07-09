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
		'import-sorting/known-framework':
			/^((@sveltejs|svelte)(\/|-preprocess|$)|(@?sanity(\/|$)))/.source,
		'import-sorting/known-first-party': /^\$(app|lib)(\/|$)/.source,
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
		// 'import/order': [
		// 	'error',
		// 	{
		// 		alphabetize: {
		// 			caseInsensitive: true,
		// 			order: 'asc',
		// 		},
		// 		groups: [
		// 			'builtin',
		// 			'external',
		// 			'internal',
		// 			'parent',
		// 			['sibling', 'index'],
		// 		],
		// 		'newlines-between': 'always',
		// 		pathGroups: [
		// 			{
		// 				pattern:
		// 					'{@sveltejs/**,svelte/**,svelte?(-preprocess),@sanity/**,sanity/**,sanity}',
		// 				group: 'builtin',
		// 				position: 'after',
		// 			},
		// 			{
		// 				pattern: '$?(app|lib)/**',
		// 				group: 'internal',
		// 				position: 'after',
		// 			},
		// 			{
		// 				pattern: '*.+(css)',
		// 				group: 'index',
		// 				position: 'after',
		// 				patternOptions: {
		// 					matchBase: true,
		// 				},
		// 			},
		// 		],
		// 		pathGroupsExcludedImportTypes: ['svelte'],
		// 	},
		// ],

		'import-sorting/order': 'error',

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
				project: path.resolve('studio', 'tsconfig.json'),
			},
			rules: {
				'import/extensions': ['off'],
			},
		},
	],
}

module.exports = config
