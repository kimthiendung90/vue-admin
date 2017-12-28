'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const entries = require('./entry')()
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: entries.entries,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'lib': path.resolve(__dirname, '../src/lib'),
            'common': path.resolve(__dirname, '../src/common'),
            'scss': path.resolve(__dirname, '../src/sass'),
            'components': path.resolve(__dirname, '../src/components'),
            'images': path.resolve(__dirname, '../src/images'),
            'src': path.resolve(__dirname, '../src'),

            'utils': path.resolve(__dirname, '../src/common/utils.js'),
            'layer': path.resolve(__dirname, '../src/common/layer.js'),
            'mAxios': path.resolve(__dirname, '../src/common/mAxios.js'),

            'dropzone': path.resolve(__dirname, '../src/lib/dropzone.js'),
            'store': path.resolve(__dirname, '../src/store/index.js'),
            'cookie': path.resolve(__dirname, '../src/lib/cookie.js'),
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: !config.dev.showEslintErrorsInOverlay
                }
            }] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.(mjs|js)$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
                // exclude: /node_modules|lib\/|library\/|dev\/avalon|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [].concat(function () {
        // 提取手动配置的 chunk
        if (entries.commonsChunks.length > 0) {
            return new webpack.optimize.CommonsChunkPlugin({
                names: entries.commonsChunks,
                minChunks: Infinity
            })
        } else {
            return []
        }
    }())
}
