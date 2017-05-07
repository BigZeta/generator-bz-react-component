var webpack = require('webpack');
var path = require('path');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');


module.exports = (env) => {
    return {
        context: path.resolve(__dirname, '../'),
        entry: {
            'app': './src/index.js'
        },
        output: {
            path: path.resolve('dist/js'),
            filename: '[name]-[hash].js',
            chunkFilename: '[name]-[chunkhash].js',
            libraryTarget:'var',
            library:'[name]',
            publicPath: '/static/<%= appname %>/js/'
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


            // Need this plugin for deterministic hashing
            // until this issue is resolved: https://github.com/webpack/webpack/issues/1315
            // for more info: https://webpack.js.org/how-to/cache/
            new WebpackMd5Hash(),

            // This does something anyway
            new ChunkManifestPlugin({
                filename: 'chunk-manifest.json',
                manifestVariable: 'webpackManifest'
            }),

            // Creates a manifest file I can use to refer to the generated outputs.
            new ManifestPlugin({
                publicPath: '/static/<%= appname %>/js/'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js|\.jsx$/,
                    use: [
                        'babel-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        }
                    ]
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        'url-loader?limit=10000&mimetype=application/font-woff'
                    ]
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css']
        },
        externals:{
            // require("jquery") is external and available
            //  on the global var jQuery
            'jquery': 'jQuery',
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    }
};

