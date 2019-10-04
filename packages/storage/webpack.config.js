const slsw = require('serverless-webpack');

module.exports = {
    mode: 'development',
    entry: slsw.lib.entries, // './functions/InitializeDatabase/handler.ts'
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
        ws: 'ws',
    },
    resolve: {
        extensions: ['.ts', '.mjs', '.js'],
    },
};
