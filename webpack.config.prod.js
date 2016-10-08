var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // devtool: 'source-map',
  entry: {
    s: './app/js/sw.js',
    index: './app/js/index.js'
  },
  output: {
    path: path.join(__dirname, 'prod'),
    filename: './js/[name].js', // Template based on keys in entry above
    publicPath: './'
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: [
      './node_modules',
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new ExtractTextPlugin('./css/main.css', { allChunks: true })
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
      test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
    }],
    postcss: [
      require('postcss-cssnext'),
    ],
    sassLoader: {
      includePaths: [path.resolve(__dirname, 'src')]
    },
  },
}
