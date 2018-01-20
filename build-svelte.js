const fs = require('fs');
const path = require('path');
const svelte = require('svelte');

Promise.all([
  process('app/components/App/App.svelte.html'),
  process('app/components/Ace/Ace.svelte.html'),
]).catch(error => {
  console.error(error.toString());
  process.exit(1);
});

function process(input) {
  return svelte
    .preprocess(fs.readFileSync(input, 'utf-8'), {
      filename: path.resolve(input),
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
        path.join(path.dirname(input), 'index.js'),
        '// Auto-generated from the svelte component; do not edit manually\n' +
          code
      );
    });
}
