module.exports = {
    src: './src',
    schema: require.resolve('scrpr-api/schema.graphql'),
    language: 'typescript',
    exclude: ['**/node_modules/**', '**/__generated__/**'],
};
