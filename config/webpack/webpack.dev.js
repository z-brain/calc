const webpackMerge = require('webpack-merge');

const commonConfig = require('./_webpack.common');

/**
 * Webpack configuration
 *
 * See: https://webpack.js.org/configuration/
 */
module.exports = function(options) {
  const ENV = (process.env.ENV = process.env.NODE_ENV = 'development');

  return webpackMerge(commonConfig({ env: ENV }), {

  });
};
