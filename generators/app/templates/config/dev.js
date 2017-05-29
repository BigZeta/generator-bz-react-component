import webpack from 'webpack'
import { join, resolve } from 'path'
import BundleTracker from 'webpack-bundle-tracker'
import merge from 'webpack-merge'


import baseConfig, { paths } from './base.js'
import * as partials from './partials'
import devServerConfig from './devserver'

paths.build = resolve('../dist.dev')

export default ({ env, options: { watch } }) => {
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
                    join(paths.devapp, 'index.js'),
                ]
            },
            output: {
                path: paths.build,
                filename: '[name].js',
                libraryTarget: 'var',
            },
            plugins: [
                // Creates a manifest file that is Django compatible and read by the Django modules
                new BundleTracker({
                    path: paths.lib,
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
        watch ? devServerConfig() : {}
    )
}
