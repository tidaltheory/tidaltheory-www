/** @type {import('stylelint').Config} */
const config = {
	extends: ['@zazen/stylelint-config'],
	rules: {
		'at-rule-no-unknown': [
			true,
			{ ignoreAtRules: ['tailwind', 'screen', 'layer'] },
		],
	},
}

module.exports = config
