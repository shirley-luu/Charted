const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve('./client/index.js'),
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    publicPath: '/build'
  },
  devServer: {
    static: {
      directory: path.resolve('./build'),
      publicPath: '/',
    },
    proxy: {
      '/api/spotify/login': 'http://localhost:3000',
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      },
    },
    compress: false,
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './client/index.html' })],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  }
};