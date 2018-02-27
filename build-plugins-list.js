'use strict';
const fs = require('fs');
const prettier = require('prettier');
const pluginsData = require('postcss-plugins');

const plugins = require('./plugins')
  .map(plugin =>
    Object.assign(plugin, pluginsData.find(p => p.name === plugin.name) || {})
  )
  .map(plugin => ({
    name: plugin.name,
    pkgName: plugin.pkgName || plugin.name,
    pkgUrl: `https://www.npmjs.com/package/${plugin.pkgName || plugin.name}`,
    config: plugin.config,
    url: plugin.url,
    description: plugin.description,
    tags: plugin.tags || [],
    author: plugin.author,
    stars: plugin.stars,
  }));

replaceContent(
  'README.md',
  plugins
    .map(plugin => {
      return `* [\`${plugin.name}\`](${plugin.url})`;
    })
    .join('\n'),
  { parser: 'markdown' }
);

replaceContent(
  'app/plugins.js',
  plugins
    .map(plugin => {
      return `
  '${plugin.name}': {
    name: '${plugin.name}',
    import: () =>
      import(/* webpackChunkName: '${plugin.name}' */ '${plugin.pkgName}')
      .then(p => p.default(${
        plugin.config ? JSON.stringify(plugin.config) : ''
      })),
    pkgName: '${plugin.pkgName}',
    pkgUrl: '${plugin.pkgUrl}',
    config: ${plugin.config ? JSON.stringify(plugin.config) : null},
    url: '${plugin.url}',
    description: \`${plugin.description || ''}\`,
    tags: ${JSON.stringify(plugin.tags)},
    author: '${plugin.author || ''}',
    stars: ${plugin.stars},
  },`;
    })
    .join('\n')
);

function replaceContent(file, list, options) {
  const text = fs.readFileSync(file, 'utf8');
  const newText = text.replace(
    /(<!--|\/\*) AUTO-GENERATED; DO NOT EDIT (-->|\*\/)[\s\S]*(<!--|\/\*) END AUTO-GENERATED (-->|\*\/)/,
    `$1 AUTO-GENERATED; DO NOT EDIT $2

${list}

$3 END AUTO-GENERATED $4`
  );
  fs.writeFileSync(file, format(newText, options));
}

function format(code, options = {}) {
  options = Object.assign(
    {},
    prettier.resolveConfig.sync('package.json'),
    options
  );
  return prettier.format(code, options);
}
