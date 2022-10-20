const config = {
	root: true,
	extends: ['@zazen', 'plugin:svelte/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		extraFileExtensions: ['.svelte'],
	},
	env: { browser: true },
	rules: {
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
	],
}

module.exports = config
