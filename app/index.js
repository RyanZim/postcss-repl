import _debounce from 'lodash.debounce';

import postcss from 'postcss';
import pluginsObj from './plugins';
import filterDupes from 'postcss-filter-plugins';

import { browserslistDefaults } from './util';
import App from './components/App';

const app = new App({
  target: document.getElementById('app'),
  data: {
    plugins: Object.values(pluginsObj),
  },
});

const compile = _debounce(
  () => {
    try {
      const { input, browsers, selectedPlugins: plugins } = app.get();

      Promise.all(
        plugins.map(name => {
          const config = {
            browsers: browsers || browserslistDefaults,
            ...pluginsObj[name].config,
          };
          return pluginsObj[name]
            .import()
            .then(plugin => plugin.default(config));
        })
      )
        .then(plugins => {
          plugins = plugins.concat([
            filterDupes({
              template: plugin =>
                `${plugin.postcssPlugin} is included more than once in the plugin chain`,
            }),
          ]);

          return postcss(plugins).process(input, { from: undefined });
        })
        .then(result => {
          app.set({
            output: result.css,
            error: result
              .warnings()
              .map(warn => {
                return `Warning: ${
                  warn.plugin === 'postcss-filter-plugins'
                    ? warn.text
                    : warn.toString()
                }`;
              })
              .join('\n'),
          });
        })
        .catch(error => {
          console.error(error);
          app.set({ error: error.toString() });
        });
    } catch (e) {
      console.error(e);
    }
  },
  16, // Around 60fps
  { leading: true }
);

app.on('state', ({ changed }) => {
  if (changed.input || changed.selectedPlugins || changed.browsers) compile();
});
compile();

// Remove loading message
document.getElementById('loading').outerHTML = '';
