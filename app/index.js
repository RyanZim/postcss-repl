import 'babel-polyfill';

import _debounce from 'lodash.debounce';

import postcss from 'postcss';
import pluginsObj from './plugins';
import filterDupes from 'postcss-filter-plugins';

import App from './components/App';

const app = new App({
  target: document.getElementById('app'),
  data: {
    plugins: Object.values(pluginsObj),
  },
});

const recompile = _debounce(
  () => {
    try {
      const input = app.get('input');
      const plugins = app
        .get('selectedPlugins')
        .map(name => pluginsObj[name].plugin)
        .concat([
          filterDupes({
            template: plugin =>
              `${
                plugin.postcssPlugin
              } is included more than once in the plugin chain`,
          }),
        ]);

      postcss(plugins)
        .process(input, { from: undefined })
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

app.observe('input', recompile);
app.observe('selectedPlugins', recompile);
app.observe('checkedPlugins', obj => {
  const plugins = [];
  for (const plugin in obj) {
    if (obj[plugin]) plugins.push(plugin);
  }
  app.set({ selectedPlugins: plugins });
});

// Remove loading message
document.getElementById('loading').outerHTML = '';
