import zazenConfig from '@zazen/prettier-config'

const config = {
	...zazenConfig,
	plugins: [
		...zazenConfig.plugins,
		'prettier-plugin-svelte',
		'prettier-plugin-tailwindcss',
	],
	svelteIndentScriptAndStyle: false,
	svelteSortOrder: 'options-scripts-markup-styles',
	overrides: [
		...zazenConfig.overrides,
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
			},
		},
	],
}

export default config
