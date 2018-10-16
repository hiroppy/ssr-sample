'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = (baseConfig, env, config) => {
  const rules = [
    {
      // for graphql
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    },
    {
      test: /\.(ts|tsx)$/,
      use: require.resolve('awesome-typescript-loader')
    }
  ];

  config.module.rules.push(...rules);
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
