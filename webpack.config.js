'use strict';

const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const common = {
  output: {
    filename: '[name].bundle.js',
    publicPath: '/public/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new Dotenv({
      path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      safe: false,
    }),
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new LoadablePlugin(),
  ],
};

module.exports = common;
