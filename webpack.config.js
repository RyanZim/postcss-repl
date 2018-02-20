const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const common = {
  entry: './app/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.html'],
    mainFields: ['browser', 'main', 'module'],
    alias: {
      'caniuse-lite': path.resolve(__dirname, 'node_modules/caniuse-lite'),
      autoprefixer: path.resolve(__dirname, 'node_modules/autoprefixer'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svelte\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            script({ content, attributes, filename }) {
              if (content.trim() && attributes.src) {
                throw new Error(
                  'Cannot pass src attribute and have inline content'
                );
              }
              if (attributes.src) {
                const code = fs.readFileSync(
                  path.join(path.dirname(filename), attributes.src),
                  'utf-8'
                );
                return { code };
              }
            },
          },
        },
      },
      {
        test: /(svgo|source-map|postcss-reporter)/,
        use: 'null-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(postcss-mixins|browserslist)/,
      path.resolve(__dirname, 'noop')
    ),
  ],
  node: {
    fs: 'empty',
  },
};

const production = {
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
    }),
  ],
};

module.exports = NODE_ENV === 'production' ? merge(common, production) : common;
