const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
    dist: path.join(__dirname, 'dist')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/index.js',
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.dist + '/index.html'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
]);

module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            devserver(),
        ])
    }
};
