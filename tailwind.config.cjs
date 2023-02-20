const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss/types').Config} */
const config = {
	content: ['src/**/*.svelte', 'src/lib/classnames.ts', 'src/app.html'],
	theme: {
		colors: {
			white: '#fff',
			black: '#000',

			grey: {
				100: '#f1f2f2',
				200: '#e7ebed',
				300: '#dee4e8',
				400: '#c0c8cd',
				500: '#949ca1',
				600: '#62696d',
				700: '#393e41',
				800: '#202326',
				900: '#16191b',
			},
			cyan: {
				100: '#d4fffd',
				200: '#aafcff',
				300: '#80f2ff',
				400: '#60e4ff',
				500: '#2cccff',
				600: '#20a0db',
				700: '#1679b7',
				800: '#0e5693',
				900: '#083e7a',
			},
		},
		fontFamily: {
			display: 'Antenna, sans-serif',
			sans: 'Inter, sans-serif',
		},
		fontMetrics: {
			display: {
				capHeight: 741,
				ascent: 800,
				descent: -200,
				lineGap: 200,
				unitsPerEm: 1000,
			},
			sans: {
				capHeight: 2048,
				ascent: 2728,
				descent: -680,
				lineGap: 0,
				unitsPerEm: 2816,
			},
		},
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.grey.200'),

						a: {
							'text-decoration': 'underline',
							'text-decoration-color': 'transparent',
							'text-decoration-thickness': '1.5px',
							outline: '2px',
							'outline-offset': '2px',
							'outline-color': '#2cccff',
							'border-radius': '1px',
							transition:
								'text-decoration-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
						},
						'a:hover': {
							'text-decoration-color': 'inherit',
						},
						'a:focus-visible': {
							'outline-style': 'solid',
						},

						'code::before': {
							content: 'none',
						},
						'code::after': {
							content: 'none',
						},
					},
				},
			}),
			spacing: {
				15: '3.75rem',
			},
		},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-capsize')({ className: 'leading-trim' }),
		require('tailwindcss-opentype'),
		plugin(({ /* addUtilities, */ addVariant, e, postcss }) => {
			addVariant('firefox', ({ container, separator }) => {
				let isFirefoxRule = postcss.atRule({
					name: '-moz-document',
					params: 'url-prefix()',
				})

				isFirefoxRule.append(container.nodes)
				container.append(isFirefoxRule)
				isFirefoxRule.walkRules((rule) => {
					rule.selector = `.${e(
						`firefox${separator}${rule.selector.slice(1)}`
					)}`
				})
			})
		}),
	],
}

module.exports = config
