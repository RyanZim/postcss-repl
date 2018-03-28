'use strict';
const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.svelte.html', '.html'],
    alias: {
      // Force common version
      postcss: path.resolve(__dirname, 'node_modules/postcss'),
      'caniuse-lite': path.resolve(__dirname, 'node_modules/caniuse-lite'),
      autoprefixer: path.resolve(__dirname, 'node_modules/autoprefixer'),
      browserslist: path.resolve(__dirname, 'node_modules/browserslist'),
      // HACK: postcss-cssnext requires this, and doesn't use .default to access it
      'postcss-font-family-system-ui': path.resolve(
        __dirname,
        'node_modules/postcss-font-family-system-ui/index.bundle.js'
      ),
    },
    plugins: [new DirectoryNamedWebpackPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.svelte\.html$/,
        exclude: /node_modules/,
        use: 'svelte-loader',
      },
      {
        test: /(svgo|source-map|postcss-reporter|@csstools\/sass-import-resolve)/,
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
