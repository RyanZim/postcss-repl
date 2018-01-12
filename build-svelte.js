const fs = require('fs');
const path = require('path');
const svelte = require('svelte');

const input = fs.readFileSync('app/components/App/App.svelte', 'utf-8');

svelte
  .preprocess(input, {
    filename: path.resolve('app/components/App/App.svelte'),
    script: ({ content, attributes, filename }) => {
      if (content.trim() && attributes.src) {
        throw new Error('Cannot pass src attribute and have inline content');
      }
      if (attributes.src) {
        const code = fs.readFileSync(
          path.join(path.dirname(filename), attributes.src),
          'utf-8'
        );
        return { code };
      }
    },
  })
  .then(preprocessed => {
    const { code } = svelte.compile(preprocessed.toString(), {
      format: 'cjs',
    });

    fs.writeFileSync(
      'app/components/App/index.js',
      '// Auto-generated from App.svelte; do not edit manually\n' + code
    );
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
