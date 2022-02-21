module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	extends: ['plugin:vue/recommended', 'prettier'],
	rules: {
		// Disable template errors regarding invalid end tags
		'vue/no-parsing-error': ['error', { 'x-invalid-end-tag': false }],

		// Maximum 5 attributes per line instead of one
		'vue/max-attributes-per-line': ['error', { singleline: 5 }],
	},
	overrides: [
		{
			files: ['pages/**/*.{js,ts,vue}', 'layouts/**/*.{js,ts,vue}'],
			rules: {
				'vue/multi-word-component-names': 'off',
			},
		},
	],
}
