import webpack from 'webpack'
import { join, resolve } from 'path'
import merge from 'webpack-merge'

import devConfig from './dev'
import * as partials from './partials'
import { paths } from './base'

const DOMAIN = process.env.DOMAIN || 'localhost'
const PORT = process.env.PORT || 8080 
const PROTOCOL = process.env.PROTOCOL || 'http'

export default () => {
    const strategy = {
        plugins: 'append',
        entry: 'append'
    };

    return merge.strategy(strategy)(
        {
            devtool: 'source-map',
            entry: {
                'app': [
                    //webpack 2 reference
                    //https://webpack.js.org/guides/hmr-react/
                    //React hmr entry
                    'react-hot-loader/patch',
                    //Dev server bundle
                    `webpack-dev-server/client?${PROTOCOL}://${DOMAIN}:${PORT}`,
                    //Only reload successful updates
                    'webpack/hot/only-dev-server'
                ]
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin(), 
            ],
        },
        //We do not have sass in this project
        partials.devServer({ 
            hot: true, 
            host: DOMAIN, 
            port: PORT, 
            base: paths.base
        }),
        partials.htmlWebpack(join(paths.devapp, './templates'))
    )
}
