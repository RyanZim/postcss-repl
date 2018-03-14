import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css.js';

export default {
  data() {
    return {
      value: '',
    };
  },
  oncreate() {
    const commonOpts = {
      mode: 'css',
      lineNumbers: true,
      extraKeys: {
        // Soft tab support
        Tab(cm) {
          const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
          cm.replaceSelection(spaces);
        },
      },
    };

    if (this.get('id') === 'output') {
      const editor = new CodeMirror(
        document.getElementById(`editor-${this.get('id')}`),
        Object.assign({ readOnly: 'nocursor' }, commonOpts)
      );
      this.observe('value', value => {
        editor.setValue(value);
      });
    } else {
      const editor = new CodeMirror(
        document.getElementById(`editor-${this.get('id')}`),
        Object.assign({ value: this.get('value') }, commonOpts)
      );
      editor.on('change', () => {
        this.set({ value: editor.getValue() });
      });
    }
  },
};
