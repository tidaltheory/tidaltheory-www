import { Configuration } from '@nuxt/types'

const config: Configuration = {
    mode: 'universal',

    /** Headers of the page */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    /** Customize the progress-bar color */
    loading: { color: '#fff' },

    /** Global CSS */
    css: [],

    /** Plugins to load before mounting the App */
    plugins: [],

    /** Nuxt.js dev-modules */
    buildModules: [
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        // '@nuxtjs/tailwindcss',
        [
            '@nuxt/typescript-build',
            {
                typeCheck: true,
                ignoreNotFoundWarnings: true,
            },
        ],
    ],

    /** Nuxt.js modules */
    modules: ['@nuxtjs/markdownit'],

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
        // // eslint-disable-next-line @typescript-eslint/no-unused-vars
        extend(config, ctx) {},

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
    },
}

export default config
