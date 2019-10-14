const slsw = require('serverless-webpack');
const path = require('path');

const isTestMode = Object.keys(slsw.lib.entries).length === 0;

const entry =
    isTestMode
        ? { 'db-test' : './__tests__/db-test.ts' }
        : slsw.lib.entries;

const output =
    isTestMode
        ? { path: path.resolve(__dirname, 'dist'), filename: '[name].js' }
        : undefined;

module.exports = {
    mode: 'development',
    entry,
    output,
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
