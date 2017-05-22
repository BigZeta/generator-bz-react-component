import webpack from 'webpack'
import { join, resolve } from 'path'
import BundleTracker from 'webpack-bundle-tracker'
import webpackMerge from 'webpack-merge'


import baseConfig, { paths } from './base.js'

import * as partials from './partials'

const DOMAIN = 'localhost'
const PORT = 8080
const PROTOCOL = 'http'
const BASE = 'dist.dev'

export default env => {
    const strategy = {
        plugins: 'append',
        'output.filename': 'replace',
        'output.path': 'replace',
        'output.libraryTarget': 'replace',
    }

    return webpackMerge.strategy(strategy)(
        baseConfig(env),
        {
            devtool: 'source-map',
            entry: {
                app: [
                    //React hmr entry
                    'react-hot-loader/patch',
                    //Dev server bundle
                    `webpack-dev-server/client?${PROTOCOL}://${DOMAIN}:${PORT}`,
                    //Only reload successful updates
                    'webpack/hot/only-dev-server',
                    join(__dirname, '../dev/index.js'),
                ]
            },
            output: {
                path: path.resolve(BASE),
                filename: '[name].js',
                libraryTarget: 'var',
            },
            plugins: [
                // Creates a manifest file that is Django compatible and read by the Django modules
                new BundleTracker({
                    //path: path.resolve('lib'),
                    path: 'lib',
                    filename: 'webpack-stats.json',
                    logTime: false,
                    indent: 4,
                }),
            ],
        },
        partials.copyAssets(paths),
        {
            plugins: [
                new webpack.DefinePlugin({
                    DEV_LOGGING: JSON.stringify(true),
                }),
            ],
        },
        partials.loadCSS(),
        partials.loadSCSS(),
        partials.htmlWebpack('./dev/templates'),
        partials.devServer({ 
            hot: true, 
            host: DOMAIN, 
            port: PORT, 
            base: BASE
        })
    )
}