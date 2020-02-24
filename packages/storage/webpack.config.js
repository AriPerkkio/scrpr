const webpack = require('webpack');
const slsw = require('serverless-webpack');
const path = require('path');

const isLocalMode = Object.keys(slsw.lib.entries).length === 0;
const testModeEntries = {
    'db-test' : './__tests__/db-test.ts',
    'handler': './functions/InitializeDatabase/handler.ts'
};

const entry =
    isLocalMode
        ? testModeEntries
        : slsw.lib.entries;

const output =
    isLocalMode
        ? { path: path.resolve(__dirname, 'dist'), filename: '[name].js', libraryTarget: 'umd' }
        : undefined;

module.exports = {
    mode: 'production',
    entry,
    output,
    target: 'node',
    optimization: {
        minimize: false,
    },
    plugins: [
        isLocalMode &&
            new webpack.DefinePlugin({
                'process.env.DB_USER': `'test-user'`,
                'process.env.DB_PASSWORD': `'test-setup-password'`,
                'process.env.DB_HOST': `'localhost'`,
            })
    ].filter(Boolean),
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
        modules: ['node_modules', './'],
    },
};
