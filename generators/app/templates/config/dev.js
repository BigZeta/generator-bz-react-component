import webpack from 'webpack'
import { join, resolve } from 'path'
import BundleTracker from 'webpack-bundle-tracker'
import merge from 'webpack-merge'


import baseConfig, { paths } from './base.js'
paths.build = path.resolve('../dist.dev');

import * as partials from './partials'

const DOMAIN = 'localhost'
const PORT = 8080
const PROTOCOL = 'http'

export default env => {
    const strategy = {
        plugins: 'append',
        'output.filename': 'replace',
        'output.path': 'replace',
        'output.libraryTarget': 'replace',
    }

    return merge.strategy(strategy)(
        baseConfig(env),
        {
            devtool: 'source-map',
            entry: {
                'app': './src/index.js'
            },
            output: {
                path: paths.build,
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
            base: paths.build
        })
    )
}