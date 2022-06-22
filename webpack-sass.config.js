const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DisableOutputWebpackPlugin = require('./disable-output-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, 'src/assets/index.scss')
  },
  output: {
    path: path.resolve(__dirname, 'package/bundles/')
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: ['ts-loader']
    }, {
      test: /\.s?css$/,
      loader: [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [require('autoprefixer')];
          }
        }
      }, 'sass-loader']
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'color-picker.min.css'
    }),
    new DisableOutputWebpackPlugin(/index/)
  ]
};
