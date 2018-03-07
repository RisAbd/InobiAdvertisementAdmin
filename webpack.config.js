var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: __dirname + '/src',
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./js/client.js",
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        }
      },
     {
       test: /\.css$/,
       exclude: /(node_modules|bower_components)/,
       use: [ 
          'style-loader', 
          'css-loader', 
          // 'postcss-loader' 
        ],
     },
     {
      test: /\.(eot|woff|woff2|svg|ttf|png|ogg)$/,
      exclude: /(node_modules|bower_components)/,
      use: 'file-loader',
     }
    ]
  },
  plugins: debug ? [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [require('autoprefixer')],
      },
      debug: true,
    }),
    new ExtractTextPlugin("./src/client.css"),
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
