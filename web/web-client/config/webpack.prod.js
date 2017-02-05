const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({
    env: ENV
}).metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false
});

module.exports = function (env) {
    return webpackMerge(commonConfig({
        env: ENV
    }), {
        devtool: 'source-map',

        output: {
            path: helpers.root('dist'),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },

        module: {
            rules: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader'
                }),
                include: [helpers.root('src', 'styles')]
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader'
                }),
                include: [helpers.root('src', 'styles')]
            }]
        },

        plugins: [
            new OptimizeJsPlugin({
                sourceMap: false
            }),

            new ExtractTextPlugin('[name].[contenthash].css'),

            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'HMR': METADATA.HMR,
                }
            }),

            new UglifyJsPlugin({
                // beautify: true, //debug
                // mangle: false, //debug
                // dead_code: false, //debug
                // unused: false, //debug
                // deadCode: false, //debug
                // compress: {
                //   screw_ie8: true,
                //   keep_fnames: true,
                //   drop_debugger: false,
                //   dead_code: false,
                //   unused: false
                // }, // debug
                // comments: true, //debug

                beautify: false,
                output: {
                    comments: false
                },
                mangle: {
                    screw_ie8: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false
                },
            }),

            new NormalModuleReplacementPlugin(
                /angular2-hmr/,
                helpers.root('config/empty.js')
            ),

            new NormalModuleReplacementPlugin(
                /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
                helpers.root('config/empty.js')
            ),

            // AoT
            // new NormalModuleReplacementPlugin(
            //   /@angular(\\|\/)upgrade/,
            //   helpers.root('config/empty.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //   /@angular(\\|\/)compiler/,
            //   helpers.root('config/empty.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //   /@angular(\\|\/)platform-browser-dynamic/,
            //   helpers.root('config/empty.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //   /dom(\\|\/)debug(\\|\/)ng_probe/,
            //   helpers.root('config/empty.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //   /dom(\\|\/)debug(\\|\/)by/,
            //   helpers.root('config/empty.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //   /src(\\|\/)debug(\\|\/)debug_node/,
            //   helpers.root('config/empty.js')
            // ),
            // new NormalModuleReplacementPlugin(
            //   /src(\\|\/)debug(\\|\/)debug_renderer/,
            //   helpers.root('config/empty.js')
            // ),

            /**
             * Plugin: CompressionPlugin
             * Description: Prepares compressed versions of assets to serve
             * them with Content-Encoding
             *
             * See: https://github.com/webpack/compression-webpack-plugin
             */
            //  install compression-webpack-plugin
            // new CompressionPlugin({
            //   regExp: /\.css$|\.html$|\.js$|\.map$/,
            //   threshold: 2 * 1024
            // })

            new LoaderOptionsPlugin({
                minimize: true,
                debug: false,
                options: {
                    htmlLoader: {
                        minimize: true,
                        removeAttributeQuotes: false,
                        caseSensitive: true,
                        customAttrSurround: [
                            [/#/, /(?:)/],
                            [/\*/, /(?:)/],
                            [/\[?\(?/, /(?:)/]
                        ],
                        customAttrAssign: [/\)?\]?=/]
                    },
                }
            }),

            /**
             * Plugin: BundleAnalyzerPlugin
             * Description: Webpack plugin and CLI utility that represents
             * bundle content as convenient interactive zoomable treemap
             *
             * `npm run build:prod -- --env.analyze` to use
             *
             * See: https://github.com/th0r/webpack-bundle-analyzer
             */

        ],

        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }

    });
};
