'use strict';
const fs = require('fs');
const prettier = require('prettier');
const pluginsData = require('postcss-plugins');
const pkg = require('./package.json');

// Compile data
const plugins = require('./plugins')
  .map((plugin) =>
    Object.assign(
      plugin,
      pluginsData.find((p) => p.name === plugin.name) || {},
      { version: pkg.dependencies[plugin.pkgName || plugin.name] }
    )
  )
  .map((plugin) => ({
    name: plugin.name,
    version: plugin.version,
    pkgName: plugin.pkgName || plugin.name,
    pkgUrl: `https://www.npmjs.com/package/${plugin.pkgName || plugin.name}`,
    config: plugin.config,
    url: plugin.url,
    description: plugin.description,
    tags: plugin.tags || [],
    author: plugin.author,
    stars: plugin.stars,
  }));

// Update README.md
writeFormatted(
  'README.md',
  fs
    .readFileSync('README.md', 'utf8')
    .replace(
      /<!-- AUTO-GENERATED; DO NOT EDIT -->[\s\S]*<!-- END AUTO-GENERATED -->/,
      `<!-- AUTO-GENERATED; DO NOT EDIT -->\n${plugins
        .map((plugin) => `- [\`${plugin.name}\`](${plugin.url})`)
        .join('\n')}\n\n<!-- END AUTO-GENERATED -->`
    )
);

// Write app/plugins.js (used by the app itself)
writeFormatted(
  'app/plugins.js',
  `export default {
  ${plugins
    .map(
      (plugin) => `'${plugin.name}': {
        name: '${plugin.name}',
        version: '${plugin.version}',
        description: "${plugin.description}",
        import: () =>
          import(/* webpackChunkName: '${plugin.name}' */ '${plugin.pkgName}'),
        config: ${plugin.config ? JSON.stringify(plugin.config) : null},
        url: '${plugin.url}',
        tags: ${JSON.stringify(plugin.tags)},
        author: '${plugin.author}',
        stars: ${plugin.stars}
      },`
    )
    .join('\n')}
  }`
);

function writeFormatted(filepath, code) {
  const options = { ...prettier.resolveConfig.sync('package.json'), filepath };
  fs.writeFileSync(filepath, prettier.format(code, options));
}
