'use strict';
const postcss = require('postcss');
const fs = require('fs');
const { plugins } = require('./postcss.config');

// copy favicon
fs.copyFileSync('favicon.ico', 'dist/favicon.ico');

const html = fs.readFileSync('app/index.html', 'utf8');
const css = fs.readFileSync('app/index.css', 'utf8');

postcss(plugins)
  .process(css, { from: 'app/index.css' })
  .then((result) => {
    const output = html.replace(
      '<!-- CSS auto-inlined here -->',
      `<style>
      ${result.css}
    </style>`
    );
    fs.writeFileSync('dist/index.html', output);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
