const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')

module.exports = env => {
  return {
    mode: env,
    watch: env === 'development',
    devtool: env === 'development' ? 'source-map' : 'none',
    stats: {
      modules: false,
      entrypoints: false
    },
    entry: {
      index: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
      chunkFilename: '[name]',
      library: 'utils',
      libraryTarget: 'umd'
    },
    optimization: {
      usedExports: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['cache-loader', 'babel-loader']
        }
      ]
    },
    plugins: env === 'development' ? [
      new webpack.ProgressPlugin(),
      new WebpackBuildNotifierPlugin()
    ] : [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new WebpackBuildNotifierPlugin(),
      new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
        openAnalyzer: false
      })
    ]
  }
}
