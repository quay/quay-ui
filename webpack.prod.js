const path = require('path');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
// eslint-disable-next-line import/extensions
const { stylePaths } = require('./stylePaths');
const common = require('./webpack.common.js');

module.exports = merge(common('production'), {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { mergeLonghand: false }],
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].bundle.css',
    }),
    new Dotenv({
      systemvars: true,
      silent: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          ...stylePaths,
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
});
