module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'prettier/react',
        'react-app',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/no-explicit-any': [0],
        '@typescript-eslint/explicit-function-return-type': [
            'warn',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            },
        ],
    },
    overrides: [
        {
            files: '*.js',
            rules: {
                '@typescript-eslint/no-var-requires': [0],
            },
        },
    ],
};
