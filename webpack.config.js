// Configuration file for client

'use strict';

const { join, resolve } = require('path');
const webpack = require('webpack');
const { smart } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const config = isProd ? require('./webpack.prod.config') : require('./webpack.dev.config');

const common = {
  mode: isProd ? 'production' : 'development',
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs']
  },
  module: {
    rules: [
      {
        // for graphql
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.ts|.tsx$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'tsconfig.client.json'
          }
        }
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new Dotenv({
      path: isProd ? '.env.prod' : '.env.dev',
      safe: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.IS_BROWSER': JSON.stringify(true)
    })
  ]
};

module.exports = smart(common, config);
