/** @type {import('stylelint').Config} */
const config = {
	extends: ['@zazen/stylelint-config'],
	rules: {
		'value-list-comma-newline-after': null,
		'at-rule-no-unknown': [
			true,
			{ ignoreAtRules: ['tailwind', 'screen', 'layer'] },
		],
	},
}

module.exports = config
