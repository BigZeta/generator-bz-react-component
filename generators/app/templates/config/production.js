const webpack = require('webpack');
var path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = (env) => {
    return webpackMerge(commonConfig(), {
        devtool: 'source-map',
        output: {
            path: path.resolve('dist.prod/js'),
            filename: '[name]-[chunkhash].js',
            publicPath: '/static/<%= appname %>/js/'
        },
        plugins: [
            // minifies your code
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            }),
            // Creates a manifest file that is Django compatible and read by the Django modules
            new BundleTracker({
                path: path.resolve('dist.prod'),
                filename: 'webpack-stats.json',
                logTime: true,
                indent: 4
            })
        ]
    })
}