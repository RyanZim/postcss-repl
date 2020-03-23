'use strict';
const path = require('path');
const postcss = require('postcss');
const { plugins } = require('./postcss.config');

module.exports = {
  entry: './app/index.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    mainFields: ['main'],
    extensions: ['.wasm', '.mjs', '.js', '.json', '.svelte.html'],
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
  },
  module: {
    rules: [
      {
        test: /\.svelte\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: {
              style: ({ content, filename }) => {
                return postcss(plugins)
                  .process(content, { from: filename })
                  .then((result) => ({ code: result.css }))
                  .catch((err) => {
                    console.error('failed to preprocess style', err);
                  });
              },
            },
          },
        },
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
