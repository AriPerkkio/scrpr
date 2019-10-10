const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
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
            {
                test: /\.yml$/,
                loader: 'yml-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.mjs', '.js'],
    },
};
