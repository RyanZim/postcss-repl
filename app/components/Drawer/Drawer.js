// This is included from Drawer.svelte

export default {
  components: {},
  data() {
    return {
      plugins: [],
      checkedPlugins: {},
      open: true,
    };
  },
  oncreate() {
    this.observe('checkedPlugins', obj => {
      const plugins = [];
      for (const plugin in obj) {
        if (obj[plugin]) plugins.push(plugin);
      }
      this.fire('selectedPluginsChanged', plugins);
    });
  },
};
