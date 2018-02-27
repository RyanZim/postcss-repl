'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  entry: {
    index: './app/index.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.json', '.html'],
    mainFields: ['browser', 'main', 'module'],
    alias: {
      postcss: path.resolve(__dirname, 'node_modules/postcss'),
      'caniuse-lite': path.resolve(__dirname, 'node_modules/caniuse-lite'),
      autoprefixer: path.resolve(__dirname, 'node_modules/autoprefixer'),
      browserslist: path.resolve(__dirname, 'node_modules/browserslist'),
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
  node: {
    fs: 'empty',
  },
};
