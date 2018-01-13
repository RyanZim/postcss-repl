module.exports = [
  require('postcss-simple-vars'),
  require('postcss-advanced-variables')({ disable: ['@import'] }),
  require('postcss-mixins'),
  require('postcss-nesting'),
  require('postcss-nested'),
  require('postcss-short'),
  require('rucksack-css'),
  require('lost'),
  require('postcss-cssnext')({ warnForDuplicates: false }),
  require('postcss-ordered-values'),
  require('postcss-calc'),
  require('postcss-flexbugs-fixes'),
  require('autoprefixer'),
  require('cssnano-browser'),
].reduce((obj, plugin) => {
  plugin = plugin.postcssPlugin ? plugin : plugin();
  obj[plugin.postcssPlugin] = {
    plugin,
    name: plugin.postcssPlugin,
    url: `https://www.npmjs.com/package/${plugin.postcssPlugin}`,
  };
  return obj;
}, {});
