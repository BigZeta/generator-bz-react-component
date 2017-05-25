import webpack from 'webpack'
import { join, resolve } from 'path'
import BundleTracker from 'webpack-bundle-tracker'
import merge from 'webpack-merge'


import baseConfig, { paths } from './base.js'
import * as partials from './partials'
import devServerConfig from './devserver'

export default ({ env, serve }) => {
    const strategy = {
        plugins: 'append',
        output: 'replace',
        entry: 'replace',
        module: 'append'
    }
    return merge.strategy(strategy)(
        baseConfig(),
        {
            devtool: 'source-map',
            entry: {
                'app': [
                    join(__dirname, '../dev/index.js'),
                ]
            },
            output: {
                path: resolve('dist.dev/js'),
                filename: '[name].js',
                libraryTarget: 'var',
            },
            plugins: [
                // Creates a manifest file that is Django compatible and read by the Django modules
                new BundleTracker({
                    //path: path.resolve('lib'),
                    path: resolve('dist.dev'),
                    filename: 'webpack-stats.json',
                    logTime: false,
                    indent: 4,
                }),
            ],
        },
        {
            plugins: [
                new webpack.EnvironmentPlugin({
                    DEV_LOGGING: true,
                    NODE_ENV: env
                })
            ],
        },
        //We do not have sass in this project
        partials.loadCSS(),
        // activate devserver
        serve ? devServerConfig() : {}
    )
}
