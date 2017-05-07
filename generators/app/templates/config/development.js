const webpack = require('webpack');
var path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = (env) => {
    return webpackMerge(commonConfig(env), {
            devtool: 'source-map',
            entry: {
                'synoptic_editor': [
                    './src/index.js'
                ]
            },
            output: {
                // Not using hash in development -- just easier.
                path: path.resolve('dist.dev/js'),
                filename: '[name].js',
                publicPath: '/static/<%= appname %>/js/'
            }
            ,
            plugins: [
                // Creates a manifest file that is Django compatible and read by the Django modules
                new BundleTracker({
                    path: path.resolve('dist.dev'),
                    filename: 'webpack-stats.json',
                    logTime: true,
                    indent: 4
                }),
                new webpack.HotModuleReplacementPlugin()
            ],
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loaders: ['react-hot-loader', 'babel-loader']
                    },
                    {
                        test: /\.css$/,
                        loader: 'style-loader!css-loader'
                    },
                ]
            }
        }
    )
};

