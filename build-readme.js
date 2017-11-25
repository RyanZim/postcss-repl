const fs = require('fs');
const plugins = require('./app/plugins');

let list = Object.values(plugins)
  .map(plugin => {
    return `* [\`${plugin.name}\`](${plugin.url})`;
  })
  .join('\n');

const text = fs.readFileSync('README.md', 'utf8');
const newText = text.replace(
  /<!-- AUTO-GENERATED; DO NOT EDIT -->[\s\S]*<!-- END AUTO-GENERATED -->/,
  `<!-- AUTO-GENERATED; DO NOT EDIT -->

${list}

<!-- END AUTO-GENERATED -->`
);
fs.writeFileSync('README.md', newText);
