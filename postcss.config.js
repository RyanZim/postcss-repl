const atImport = require('postcss-import');
const nesting = require('postcss-nesting');

module.exports = ctx => ({
  plugins: [atImport(), nesting()],
});
