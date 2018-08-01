'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: resolve('src', 'client', 'index.tsx'),
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[id].[chunkhash].bundle.js'
  },
  plugins: [new webpack.optimize.AggressiveMergingPlugin()],
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  }
};

module.exports = config;
