'use strict';

const { join, resolve } = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const common = {
  output: {
    filename: '[name].bundle.js',
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
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.client.json'
          }
        }
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new Dotenv({
      path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      safe: false
    }),
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
};

module.exports = common;
