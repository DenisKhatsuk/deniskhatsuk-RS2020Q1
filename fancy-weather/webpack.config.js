const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
require('babel-polyfill');


module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: ['babel-polyfill', './src/js/App.js'],
    output: {
      filename: 'scripts.js',
      path: path.join(__dirname, './dist'),
    },
    devServer: {
      contentBase: './dist',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'src/img/',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'src/fonts/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Fancy Weather',
        template: './src/html/template.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new CopyPlugin([
        { from: 'src/img/base', to: './src/img' },
      ]),
    ],
  };

  return config;
};
