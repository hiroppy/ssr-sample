'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const PwaManifest = require('webpack-pwa-manifest');
const { GenerateSW } = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

const config = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].[id].bundle.js',
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new ManifestPlugin(),
    // https://developer.mozilla.org/en-US/docs/Web/Manifest
    new PwaManifest({
      filename: 'manifest.webmanifest',
      name: 'ssr-sample',
      short_name: 'ssr-sample',
      theme_color: '#3498db',
      description: 'introducing SPA and SSR',
      background_color: '#f5f5f5',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: resolve('./assets/avatar.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      include: [/\.js$/],
      runtimeCaching: [
        {
          urlPattern: new RegExp('.'), // for start_url
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: new RegExp('api|graphql'),
          handler: 'NetworkFirst',
        },
        {
          urlPattern: new RegExp('https://fonts.googleapis.com|https://fonts.gstatic.com'),
          handler: 'CacheFirst',
        },
      ],
    }),
    new RobotstxtPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimize: true,
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

module.exports = config;
