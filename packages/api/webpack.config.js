/* eslint-disable */
const slsw = require('serverless-webpack');

console.log('Entries');
console.log(slsw.lib.entries);

module.exports = {
    mode: 'production',
    entry: slsw.lib.entries,
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.mjs', '.js'],
    },
};
