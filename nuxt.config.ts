import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
	target: 'static',

	/** Headers of the page */
	head: {
		title: 'Tidal Theory',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: '',
			},
		],
		link: [
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
			},
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
		bodyAttrs: {
			class: 'text-grey-100 bg-grey-800',
		},
	},

	/** Customize the progress-bar color */
	loading: { color: '#fff' },

	/** Global CSS */
	css: ['~/assets/tailwind.css'],

	/** Plugins to load before mounting the App */
	plugins: [],

	/** Nuxt.js dev-modules */
	buildModules: [
		'@nuxt/postcss8',
		[
			'@nuxt/typescript-build',
			{
				typeCheck: true,
				ignoreNotFoundWarnings: true,
			},
		],
	],

	/** Nuxt.js modules */
	modules: ['@nuxt/content', '@nuxtjs/markdownit'],

	/**
	 * MarkdownIt options
	 * @see https://github.com/markdown-it/markdown-it
	 */
	markdownit: {
		injected: true,
	},

	/** Build configuration */
	build: {
		extend(config) {
			/**
			 * Fixes `Can't import the named export '[foo]' from non EcmaScript
			 * module (only default export is available)` error.
			 * @see https://github.com/vueuse/vueuse/issues/718#issuecomment-914239247
			 */
			config.module?.rules.push({
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			})
		},

		html: {
			/**
			 * Prevent incorrect removal of empty CSS custom properties,
			 * i.e. `--tw-blur: ;`. Other minify options are include to maintain
			 * default settings.
			 * @see https://nuxtjs.org/docs/configuration-glossary/configuration-build/#htmlminify
			 */
			minify: {
				collapseBooleanAttributes: true,
				decodeEntities: true,
				minifyCSS: false,
				minifyJS: true,
				processConditionalComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				trimCustomFragments: true,
				useShortDoctype: true,
			},
		},

		/**
		 * @see https://nuxtjs.org/docs/configuration-glossary/configuration-build#postcss
		 * @see https://tailwindcss.com/docs/using-with-preprocessors#nesting
		 */
		postcss: {
			plugins: {
				'postcss-import': {},
				'postcss-url': {},
				'postcss-preset-env': {},
				'tailwindcss/nesting': {},
				tailwindcss: {},
				autoprefixer: {},
				cssnano: { preset: 'default' },
			},
		},
	},
}

export default config
