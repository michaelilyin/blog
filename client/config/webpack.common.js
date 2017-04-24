'use strict';

const webpack = require('webpack');
const helpers = require('./helpers');

// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
    title: 'Personal website',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
    const isProd = options.env === 'production';

    return {

        /*
         * The entry point for the bundle
         */
        entry: {
            'polyfills': './src/polyfills.browser.ts',
            'main': AOT ? './src/main.browser.aot.ts' : './src/main.browser.ts'
        },

        /*
         * Options affecting the resolving of modules.
         */
        resolve: {
            /*
             * An array of extensions that should be used to resolve modules.
             */
            extensions: ['.ts', '.js', '.json'],
            // An array of directory names to be resolved to the current directory
            modules: [helpers.root('src'), helpers.root('node_modules')],

        },

        /*
         * Options affecting the normal modules.
         */
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [{ // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                            loader: 'ng-router-loader',
                            options: {
                                loader: 'async-import',
                                genDir: 'compiled',
                                aot: AOT
                            }
                        }, {
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: 'tsconfig.webpack.json',
                                experimentalDecorators: true
                            }
                        }, {
                            loader: 'angular2-template-loader'
                        }
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                }, {
                    test: /\.json$/,
                    use: 'json-loader'
                }, {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    exclude: [helpers.root('src', 'styles')]
                }, {
                    test: /\.scss$/,
                    use: ['to-string-loader', 'css-loader', 'sass-loader'],
                    exclude: [helpers.root('src', 'styles')]
                }, {
                    test: /\.html$/,
                    use: 'raw-loader',
                    exclude: [helpers.root('src/index.html'), helpers.root('src/404.html')]
                }, {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader'
                },
            ],

        },

        plugins: [
            new AssetsPlugin({
                path: helpers.root('build/dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),

            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),

            new CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['main'],
                minChunks: module => /node_modules/.test(module.resource)
            }),

            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),

            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                helpers.root('src'), // location of your src
                {
                    // your Angular Async Route paths relative to this root directory
                }
            ),

            new CopyWebpackPlugin([
                {from: 'src/assets', to: 'assets'},
                {from: 'src/meta'},
                {from: 'src/404.html', to: '404.html'}
            ]),

            new HtmlWebpackPlugin({
                template: 'src/index.html',
                title: METADATA.title,
                chunksSortMode: 'dependency',
                metadata: METADATA,
                inject: 'head'
            }),

            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),

            new HtmlElementsPlugin({
                headTags: require('./head-config.common')
            }),

            new LoaderOptionsPlugin({}),

            // Fix Angular 2
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)async/,
                helpers.root('node_modules/@angular/core/src/facade/async.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)collection/,
                helpers.root('node_modules/@angular/core/src/facade/collection.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)errors/,
                helpers.root('node_modules/@angular/core/src/facade/errors.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)lang/,
                helpers.root('node_modules/@angular/core/src/facade/lang.js')
            ),
            new NormalModuleReplacementPlugin(
                /facade(\\|\/)math/,
                helpers.root('node_modules/@angular/core/src/facade/math.js')
            ),

            new ngcWebpack.NgcWebpackPlugin({
                disabled: !AOT,
                tsConfig: helpers.root('tsconfig.webpack.json'),
                resourceOverride: helpers.root('config/resource-override.js')
            })

        ],

        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }

    };
};
