'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const { smart } = require('webpack-merge');
const DotenvPlugin = require('webpack-dotenv-plugin');
// const common = require('./webpack.common.config');

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'web',
  entry: ['webpack-hot-middleware/client', resolve('src', 'client', 'index.tsx')],
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts|.tsx$/,

        // HMR: https://github.com/gaearon/react-hot-loader#typescript (only client)
        use: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new DotenvPlugin({
    //   sample: './.env',
    //   path: '.env'
    // }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true)
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
// module.exports = smart(common, config);
