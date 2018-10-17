'use strict';

const merge = require('webpack-merge');
const base = require('../webpack.config');

module.exports = (baseConfig, env, config) => merge.smart(base, config);
