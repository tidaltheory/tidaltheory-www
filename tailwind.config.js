const tailwindcssCapsize = require('tailwindcss-capsize')

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
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
            sans: 'Inter, sans-serif'
        },
        fontSize: {
            6: '1.5rem',
            8: '2rem',
            12: '3rem',
            18: '4.5rem',
            20: '5rem',
            24: '6rem',
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
    },
    extend: {},
    // variants: {},
    plugins: [tailwindcssCapsize.default({})],
    purge: {
        // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        enabled: process.env.NODE_ENV === 'production',
        content: [
            'components/**/*.vue',
            'layouts/**/*.vue',
            'pages/**/*.vue',
            'plugins/**/*.js',
            'nuxt.config.js',
        ],
    },
}
