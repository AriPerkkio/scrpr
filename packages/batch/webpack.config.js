module.exports = {
    mode: 'production',
    entry: './src/batch-job.ts',
    output: {
        filename: 'batch-job.js',
    },
    target: 'node',
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        knex: 'commonjs knex', // webpack fails to bundle knex
    },
    resolve: {
        extensions: ['.ts', '.mjs', '.js'],
        modules: ['node_modules', './'],
    },
};
