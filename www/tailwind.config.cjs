const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss/types').Config} */
const config = {
	content: ['src/**/*.svelte', 'src/lib/classnames.js', 'src/app.html'],
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
				100: 'oklch(96.6% 0.056 192.1)', // '#d4fffd',
				200: 'oklch(93.3% 0.103 196.9)', // '#aafcff',
				300: 'oklch(89.1% 0.137 202.1)', // '#80f2ff',
				400: 'oklch(84.8% 0.154 209)', // '#60e4ff',
				500: 'oklch(78.2% 0.177 219.6)', // '#2cccff',
				600: 'oklch(66.2% 0.162 228.7)', // '#20a0db',
				700: 'oklch(55.1% 0.148 236.9)', // '#1679b7',
				800: 'oklch(44.4% 0.135 244.4)', // '#0e5693',
				900: 'oklch(36.8% 0.127 250.2)', // '#083e7a',
			},
		},
		fontFamily: {
			display: 'Antenna, sans-serif',
			sans: 'Inter, sans-serif',
			serif: 'Newsreader, Signifier, Times, serif',
			code: 'MonoLisa, ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
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
						'--tw-prose-links': theme('colors.white'),
						'--tw-prose-code': theme('colors.grey.100'),
						'--tw-prose-quotes': theme('colors.white'),
						'--tw-prose-captions': theme('colors.grey.500'),
						'--tw-prose-invert-body': theme('colors.grey.300'),

						'max-width': 'none',
						color: theme('colors.grey.200'),

						'& > *': {
							'max-width': '65ch',
						},

						'p, li': {
							'text-wrap': 'pretty',
						},

						a: {
							'text-decoration': 'underline',
							'text-decoration-color': theme('colors.cyan.700'),
							'text-decoration-skip-ink': 'none',
							'text-decoration-thickness': '0.75ex',
							'text-underline-offset': 'calc(-0.75ex + calc(0.0781em * 2))',
							outline: '2px',
							'outline-offset': '2px',
							'outline-color': theme('colors.cyan.500'),
							'border-radius': '1px',
							transition: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
							'transition-property':
								'text-decoration-color, text-decoration-skip-ink, text-decoration-thickness, text-underline-offset',
							'transition-behavior': 'allow-discrete',
						},
						'a:hover': {
							'text-decoration-color': 'inherit',
							'text-decoration-skip-ink': 'all',
							'text-decoration-thickness': '0.0781em',
							'text-underline-offset': 'calc(0.0781em * 2)',
						},
						'a:focus-visible': {
							'outline-style': 'solid',
						},

						'em, cite': {
							'font-family': theme('fontFamily.serif'),
							'font-weight': 'inherit',
							// 'font-size-adjust': '0.5',
							/**
							 * @todo Remove these once `font-size-adjust` has
							 *       better support.
							 */
							// 'font-size': 'calc(1em + 3px)',
							// 'line-height': '1',
						},

						pre: {
							'background-color': `${theme('colors.grey.900')}77`,
						},

						code: {
							fontFamily: theme('fontFamily.code'),
							fontSize: '0.9375em',
							fontWeight: theme('fontWeight.medium'),
						},
						'code::before': {
							content: 'none',
						},
						'code::after': {
							content: 'none',
						},

						blockquote: {
							padding: 0,
							'font-family': theme('fontFamily.display'),
							'font-size': theme('fontSize.2xl[0]'),
							'font-style': 'normal',
							'font-weight': 700,
							'line-height': theme('fontSize.2xl[1]lineHeight'),
							'border-left-width': 0,

							'& p:first-of-type': {
								'margin-top': 0,
							},
							'& p:last-of-type': {
								'margin-bottom': 0,
							},
							'& p::before': {
								'margin-left': '-0.5em',
							},
						},

						figcaption: {
							'font-size': theme('fontSize.sm[0]'),
							...theme('fontSize.sm[1]'),

							'& a': {
								'font-weight': 500,
								color: theme('colors.grey.400'),
							},

							'& small p': {
								margin: 0,
							},
						},

						del: {
							color: theme('colors.grey.500'),
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: '0.9375em',
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
						`firefox${separator}${rule.selector.slice(1)}`,
					)}`
				})
			})
		}),
	],
}

module.exports = config
