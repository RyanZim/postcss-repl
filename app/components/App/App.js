// This is included from App.svelte

import Ace from '../Ace/Ace.svelte';

const css = `p {
  color: red;
}
`;

export default {
  components: { Ace },
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
};
