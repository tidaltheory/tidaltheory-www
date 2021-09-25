import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
    target: 'static',

    /** Headers of the page */
    head: {
        title: process.env.npm_package_name ?? '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description ?? '',
            },
        ],
        link: [
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css2?family=Inter&display=swap',
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
    css: [],

    /** Plugins to load before mounting the App */
    plugins: [],

    /** Nuxt.js dev-modules */
    buildModules: [
        '@nuxt/postcss8',
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
        [
            '@nuxt/typescript-build',
            {
                typeCheck: true,
                ignoreNotFoundWarnings: true,
            },
        ],
    ],

    tailwindcss: {
        // add '~tailwind.config` alias
        // exposeConfig: true,
    },

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
        /** Extend webpack config here */
        // extend(config, { isClient }) { },

        /** Fix error about missing corejs modules */
        babel: {
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            corejs: { version: 3 },
                        },
                    ],
                ]
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
                cssnano: { preset: 'default' },
            },
        },
    },
}

export default config
