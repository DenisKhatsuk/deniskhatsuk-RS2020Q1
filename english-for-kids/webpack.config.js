const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: './src/js/entry.js',
    output: {
      filename: 'scripts.js',
      path: path.join(__dirname, './dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    ],
  }

  return config;
}