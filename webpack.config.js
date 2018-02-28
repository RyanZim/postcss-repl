'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  entry: './app/index.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.html'],
    alias: {
      // Force common version
      postcss: path.resolve(__dirname, 'node_modules/postcss'),
      'caniuse-lite': path.resolve(__dirname, 'node_modules/caniuse-lite'),
      autoprefixer: path.resolve(__dirname, 'node_modules/autoprefixer'),
      browserslist: path.resolve(__dirname, 'node_modules/browserslist'),
      // HACKS:
      // postcss-cssnext requires this, and doesn't use .default to access it
      'postcss-font-family-system-ui': path.resolve(
        __dirname,
        'node_modules/postcss-font-family-system-ui/index.bundle.js'
      ),
      // imports caniuse-lite with default instead of named exports
      'postcss-preset-env': path.resolve(
        __dirname,
        'node_modules/postcss-preset-env/index.bundle.js'
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
