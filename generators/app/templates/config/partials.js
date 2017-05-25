import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

// Other Stuff
export const devServer = ({ hot, host, port, base } = {}) => ({  
    devServer: {
        hot,
        contentBase: base,
        historyApiFallback: true,
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
        },
    },
});

// Module Rules
export const loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,

                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
        ],
    },
});

export const loadSCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,

                use: [
                    'style-loader',
                    //'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
});

export const lintJavaScript = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                enforce: 'pre',

                loader: 'eslint-loader',
                options,
            },
        ],
    },
});

// PLUGINS
export const htmlWebpack = dir => {
    return { 
        plugins: [
            new HtmlWebpackPlugin({
                title: 'synoptic-modal',
                inject: 'body',
                template: path.join(dir, 'index.ejs')
            }),
        ],
    }
};

export const extractCSS = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin('[name].css');

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,

                    use: plugin.extract({
                        use,
                        fallback: 'style-loader',
                    }),
                },
            ],
        },
        plugins: [plugin],
    };
};

export const copyAssets = paths => ({
    plugins: [
        new CopyWebpackPlugin(
            [
                // Copy some static assets
                {
                    from: path.join(
                        paths.app,
                        'static/scss/libs/font-awesome/fonts/*'
                    ),
                    to: path.join(paths.build, 'static/css/fonts'),
                },
                {
                    from: path.join(
                        paths.app,
                        'static/scss/libs/ionicons/fonts/*'
                    ),
                    to: path.join(paths.build, 'static/css/fonts'),
                },
                {
                    from: path.join(paths.app, 'static/css/**/*'),
                    to: path.join(paths.build, 'static/css/'),
                },
                {
                    from: path.join(paths.app, '/static/js/**/*'),
                    to: path.join(paths.build, 'static/js'),
                },
                {
                    from: path.join(paths.app, '/static/img/**/*'),
                    to: path.join(paths.build, 'static/img'),
                },
                {
                    from: path.join(paths.assets, '/img/**/*'),
                    to: path.join(paths.build, 'static/img'),
                },
                {
                    from: path.join(paths.assets, '/css/fonts/**/*'),
                    to: path.join(paths.build, 'static/css'),
                },
                {
                    from: path.join(paths.app, '/static/img/**/*'),
                    to: path.join(paths.build, 'static/img'),
                },
            ],
            {
                copyUnmodified: true,
            }
        ),
    ],
});
