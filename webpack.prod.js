const path = require('path');
const Dotenv = require('dotenv-webpack');
const {merge} = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
// eslint-disable-next-line import/extensions
const {stylePaths} = require('./stylePaths');
const common = require('./webpack.common.js');

module.exports = merge(common('production'), {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ['console.log', 'console.debug'],
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', {mergeLonghand: false}],
        },
      }),
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
      silent: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [...stylePaths],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
