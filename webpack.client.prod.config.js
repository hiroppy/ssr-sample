'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = {
  mode: 'production',
  entry: resolve('src', 'client', 'index.tsx'),
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].[id].bundle.js'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new ManifestPlugin(),
    new GenerateSW(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    splitChunks: {
      minSize: 100000,
      maxSize: 1500000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};

module.exports = config;
