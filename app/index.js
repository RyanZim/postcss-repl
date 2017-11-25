const _debounce = require('lodash.debounce');
const Vue = require('vue/dist/vue.common.js');

const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const pluginsObj = require('./plugins');
const filterDupes = require('postcss-filter-plugins');

const css = `p {
  color: red;
}`;

const app = new Vue({
  el: '#app',
  data: {
    input: css,
    output: css,
    error: '',
    plugins: Object.values(pluginsObj),
    selectedPlugins: [],
  },
  watch: {
    input: recompile,
    selectedPlugins: recompile,
  },
  methods: {
    process: _debounce(
      function() {
        try {
          const plugins = this.selectedPlugins
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
            .process(this.input)
            .then(result => {
              this.output = result.css;
              this.error = result
                .warnings()
                .map(warn => {
                  return `Warning: ${
                    warn.plugin === 'postcss-filter-plugins'
                      ? warn.text
                      : warn.toString()
                  }`;
                })
                .join('\n');
            })
            .catch(error => {
              this.error = error.toString();
            });
        } catch (e) {
          console.error(e);
        }
      },
      16, // Around 60fps
      { leading: true }
    ),
    tab: function(event) {
      const position = event.target.selectionEnd;
      if (event.shiftKey) {
        // Ensure that we're only deleting whitespace
        if (this.input.substring(position - 2, position) === '  ') {
          this.input =
            this.input.substring(0, position - 2) +
            this.input.substring(position);
          setCursorPosition(event.target, position - 2);
        }
      } else {
        this.input =
          this.input.substring(0, position) +
          '  ' +
          this.input.substring(position);
        setCursorPosition(event.target, position + 2);
      }
    },
  },
});

// Remove loading message
document.getElementById('loading').outerHTML = '';

function recompile() {
  this.process();
}

function setCursorPosition(element, start, end) {
  if (typeof end === 'undefined') end = start;
  setTimeout(() => {
    element.focus();
    element.setSelectionRange(start, end);
  }, 0);
}
