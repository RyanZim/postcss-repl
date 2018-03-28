// This is included from App.svelte

import CodeMirror from '../CodeMirror';
import GithubCorner from '../GithubCorner';
import Drawer from '../Drawer';

const css = `p {
  color: red;
}
`;

export default {
  components: { CodeMirror, GithubCorner, Drawer },
  data() {
    return {
      input: css,
      output: '',
      error: '',
      plugins: [],
      selectedPlugins: [],
      drawerOpen: true,
    };
  },
};
