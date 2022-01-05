const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ArcGISPlugin = require('@arcgis/webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
     index: './src/index.ts',
     hot: 'webpack/hot/dev-server.js',
     client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    static: './dist'
  },
  resolve: {
    extensions: ['.ts','.tsx','.js']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }, {
      test: /.html$/,
      use: [ { loader: 'html-loader', options: { minimize: false } } ]
    }, {
      test: /.tsx?$/, loader: 'ts-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunksSortMode: 'none'
    }),
    new ArcGISPlugin({
      locales: ['en'],
      copyAssets: true,
      assetsDir: './assets'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};