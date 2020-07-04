module.exports = {
    extends: ['@zazen/eslint-config', '@zazen/eslint-config/vue'],
    plugins: ['@typescript-eslint'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'prefer-const': 'off',

        '@typescript-eslint/no-unused-vars': [
            'error',
            { args: 'all', argsIgnorePattern: '^_' },
        ],
    },
}
