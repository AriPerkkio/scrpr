const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const YAML = require('yaml');
const fs = require('fs');

const readYML = path => YAML.parse(fs.readFileSync(path, 'utf8'));

const { DB_USER, DB_PASSWORD } = readYML('../secrets.yml');
const { DatabaseHost } = readYML('../cf-storage.yml');

module.exports = (_, args) => {
    const { env } = args;
    const isTestEnv = env === 'test';

    return {
        mode: 'development',
        entry: './src/batch-job.ts',
        output: {
            filename: 'batch-job.js',
        },
        target: 'node',
        optimization: {
            minimize: false,
        },
        plugins: [
            new webpack.DefinePlugin({
                __DB_USER__: isTestEnv ? `'test-user'` : `'${DB_USER}'`,
                __DB_PASSWORD__: isTestEnv ? `'test-setup-password'` : `'${DB_PASSWORD}'`,
                __DB_HOST__: isTestEnv ? `'localhost'` : `'${DatabaseHost}'`,
            })
        ],
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        externals: [nodeExternals(), 'bufferutil', 'utf-8-validate'],
        resolve: {
            extensions: ['.ts', '.mjs', '.js'],
        },
    };
};
