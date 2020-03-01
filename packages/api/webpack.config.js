const webpack = require('webpack');
const slsw = require('serverless-webpack');

const isDevelopmentMode = process.env.NODE_ENV === 'development';

module.exports = {
    mode: 'production',
    entry: slsw.lib.entries,
    target: 'node',
    optimization: {
        minimize: false,
    },
    plugins: [
        isDevelopmentMode && new webpack.DefinePlugin({
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
            {
                test: /\.graphql?$/,
                loader: 'webpack-graphql-loader'
            }
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
