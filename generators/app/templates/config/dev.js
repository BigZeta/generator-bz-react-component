import webpack from 'webpack'
import { join, resolve } from 'path'
import BundleTracker from 'webpack-bundle-tracker'
import webpackMerge from 'webpack-merge'


import baseConfig, { paths } from './base.js';
import * as partials from './partials';

export default env => {
    const strategy = {
        plugins: 'append',
        'output.filename': 'replace',
        'output.path': 'replace',
        'output.libraryTarget': 'replace',
    };

    return webpackMerge.strategy(strategy)(
        baseConfig(env),
        {
            devtool: 'source-map',
            entry: {
                'app': './src/index.js'
            },
            output: {
                path: path.resolve('dist.dev/js'),
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
        partials.loadCSS({exclude:/node_modules/}),
        partials.loadSCSS({exclude:/node_modules/}),
    );
};
