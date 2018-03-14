// This is included from App.svelte

import CodeMirror from '../CodeMirror';

const css = `p {
  color: red;
}
`;

export default {
  components: { CodeMirror },
  data() {
    return {
      input: css,
      output: '',
      error: '',
      plugins: [],
      selectedPlugins: [],
      checkedPlugins: {},
      drawerOpen: true,
    };
  },
};
