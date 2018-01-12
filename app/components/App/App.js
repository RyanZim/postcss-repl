// This is included from App.svelte
const css = `p {
  color: red;
}`;

export default {
  data() {
    return {
      input: css,
      output: '',
      error: '',
      plugins: [],
      selectedPlugins: [],
      checkedPlugins: {},
    };
  },
  methods: {
    tab(event) {
      if (event.key !== 'Tab') return;

      event.preventDefault();
      const position = event.target.selectionEnd;
      const input = this.get('input');

      if (event.shiftKey) {
        // Ensure that we're only deleting whitespace
        if (input.substring(position - 2, position) === '  ') {
          this.set({
            input: input.substring(0, position - 2) + input.substring(position),
          });
          setCursorPosition(event.target, position - 2);
        }
      } else {
        this.set({
          input:
            input.substring(0, position) + '  ' + input.substring(position),
        });
        setCursorPosition(event.target, position + 2);
      }
    },
  },
};

function setCursorPosition(element, start, end) {
  if (typeof end === 'undefined') end = start;
  setTimeout(() => {
    element.focus();
    element.setSelectionRange(start, end);
  }, 0);
}
