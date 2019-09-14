const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const WebappWebpackPlugin = require('webapp-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name]-[hash].css"
});

const webRoot = function (env) {
  if (env === 'production') {
    return 'https://developers.mixin.one';
  } else {
    return 'http://developers.mixin.local';
  }
};

const apiRoot = function (env) {
  if (env === 'production') {
    return 'https://api.mixin.one';
  } else {
    return 'https://api.mixin.one';
  }
};

const clientId = function (env) {
  if (env === 'production') {
    return 'fbd26bc6-3d04-4964-a7fe-a540432b16e2';
  } else {
    return 'b4565f3b-94ef-4898-bfd9-f4fc627c1e99';
  }
};

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkHash].js'
  },

  resolve: {
    alias: {
      jquery: "jquery/dist/jquery",
      handlebars: "handlebars/dist/handlebars.runtime"
    }
  },

  module: {
    rules: [{
      test: /\.html$/, loader: "handlebars-loader?helperDirs[]=" + __dirname + "/src/helpers"
    }, {
      test: /\.(scss|css)$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
        fallback: "style-loader"
      })
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
      loader: 'file-loader',
      options: {
        name(file) {
          if (process.env.NODE_ENV === 'development') {
            return '[path][name].[ext]';
          }
          return '[hash].[ext]';
        },
        emitFile: true
      },
    }, {
      test: /\.(png|svg|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: {
        name(file) {
          if (process.env.NODE_ENV === 'development') {
            return '[path][name].[ext]';
          }
          return '[hash].[ext]';
        },
        emitFile: true
      },
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: (process.env.NODE_ENV === 'production'),
      WEB_ROOT: JSON.stringify(webRoot(process.env.NODE_ENV)),
      API_ROOT: JSON.stringify(apiRoot(process.env.NODE_ENV)),
      CLIENT_ID: JSON.stringify(clientId(process.env.NODE_ENV)),
      APP_NAME: JSON.stringify('Mixin Developers')
    }),
    new HtmlWebpackPlugin({
      template: './src/layout.html'
    }),
    new WebappWebpackPlugin({
      logo: './src/launcher.png',
      prefix: 'icons-[hash]-',
      background: '#FFFFFF'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    extractSass
  ]
};
