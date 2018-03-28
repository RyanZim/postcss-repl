'use strict';
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-normalize')({ forceImport: true }),
    require('postcss-simple-vars'),
    require('postcss-preset-env')({ stage: 1 }),
    require('cssnano'),
  ],
};
