'use strict';

const { resolve } = require('path');
const webpack = require('webpack');

const config = {
  entry: ['webpack-hot-middleware/client', resolve('src', 'client', 'index.tsx')],
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
