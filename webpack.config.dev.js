'use strict'

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var proxyMiddleware = require('http-proxy-middleware')

const target = {
  target: 'http://localhost:1337'
}
const data = proxyMiddleware('/data', target)
const journey = proxyMiddleware('/journey', target)
const raw = proxyMiddleware('/raw', target)
const routes = proxyMiddleware('/routes', target)
const stations = proxyMiddleware('/stations', target)

module.exports = {
  devtool: 'source-map',
  entry: {
    // 'hot-dev-server': 'webpack/hot/dev-server',
    // 'dev-server': 'webpack-dev-server/client?http://localhost:8080',
    // 'dev-server': 'webpack-dev-server/client?http://localhost:8080/',
    // 'hot-dev-server': 'webpack/hot/dev-server',
    index: './app/js/index.js'
    // common: [
    //   'lodash'
    //   // 'jquery'
    // ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './js/[name].js' // Template based on keys in entry above
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: [
      './node_modules',
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:8080/',
        middleware: [data, journey, raw, routes, stations]
      },
      // plugin optionss
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    ),
    new ExtractTextPlugin('./main.css', { allChunks: true })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!postcss-loader!sass'),
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.vue$/,
      loaders: ['vue-loader'],
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
    }]
  },
  vue: {
    // use custom postcss plugins
    postcss: [require('postcss-cssnext')()],
    // disable vue-loader autoprefixing.
    // this is a good idea since cssnext comes with it too.
    autoprefixer: false,
    loaders: {
      sass: ExtractTextPlugin.extract("css!sass")
    }
  },
  postcss: [
    require('postcss-cssnext'),
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'src')]
  },
  // devServer: {
  //   contentBase: './dist',
  //   hot: true,
  //   quiet: false,
  //   noInfo: false,
  // },
  externals: {
    jquery: {
      root: 'jQuery',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery'
    }
  }
}
