const atImport = require('postcss-import');
const nesting = require('postcss-nesting');
const cssnano = require('cssnano');

module.exports = ctx => ({
  plugins: [atImport(), nesting(), cssnano()],
});
