/* eslint-disable */
const slsw = require('serverless-webpack');

module.exports = {
    mode: 'development',
    entry: slsw.lib.entries,
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
        ws: 'ws',
    },
    resolve: {
        extensions: ['.ts', '.mjs', '.js'],
    },
};
