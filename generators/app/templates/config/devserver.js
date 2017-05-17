import webpack from 'webpack'
import path from 'path'
import webpackMerge from 'webpack-merge'
import BundleTracker from 'webpack-bundle-tracker'
import nodeExternals from 'webpack-node-externals'
import Visualizer from 'webpack-visualizer-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import baseConfig, { paths } from './base.js'
import * as partials from './partials'


/**
 * Unused object
 * 
 */
const HTMLWebpackPluginConfig = {
    template: __dirname + '/src/templates',
};

export default env => {
    const strategy = {
        plugins: 'replace',
        'output.filename': 'replace',
        output: 'replace',
    };

    return webpackMerge.strategy(strategy)(
        baseConfig(env),
        {
            devtool: 'source-map',
            entry: {
                app: path.resolve('dev/src/index.js'),
            },
            output: {
                path: path.resolve('dist.dev/js'),
                filename: '[name].js',
                libraryTarget: 'var',
                library: '[name]',
                publicPath: '/static/<%= appname %>/js/',
            },
            plugins: [
                // Extract all 3rd party modules into a separate 'vendor' chunk
                // Wait -- will this exclude the RPE also? Probably!
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    minChunks: ({ resource }) => /node_modules/.test(resource),
                }),

                // Generate a 'manifest' chunk to be inlined in the HTML template
                new webpack.optimize.CommonsChunkPlugin('manifest'),

                // Creates a manifest file that is Django compatible and read by the Django modules
                new BundleTracker({
                    //path: path.resolve('lib'),
                    path: 'lib',
                    filename: 'webpack-stats.json',
                    logTime: false,
                    indent: 4,
                }),
                new webpack.HotModuleReplacementPlugin(),
                new Visualizer({
                    filename: './statistics.html',
                }),
            ],
            module: {
                rules: [
                    {
                        test: /\.scss$/,
                        loader: 'style!css!sass',
                    },
                    {
                        test: /\.(html|njk|nunjucks)$/,
                        loader: 'nunjucks-loader',
                        query: {
                            jinjaCompat: true,
                        },
                    },
                ],
            },
        },
        partials.devServer({
            host: process.env.HOST,
            port: process.env.PORT,
            paths: paths,
        }),
        partials.htmlWebpack(paths),
        partials.copyAssets(paths),
        {
            plugins: [
                new webpack.DefinePlugin({
                    DEV_LOGGING: JSON.stringify(true),
                }),
            ],
        }
    )
}
