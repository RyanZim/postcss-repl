import ace from 'brace';
import 'brace/theme/iplastic';

export default {
  data() {
    return {
      value: '',
    };
  },
  oncreate() {
    const editor = ace.edit(`editor-${this.get('id')}`);
    editor.$blockScrolling = Infinity; // to silence warning
    editor.getSession().setTabSize(2);
    editor.setTheme('ace/theme/iplastic');
    editor.setFontSize(14); // 14px
    editor.setValue(this.get('value'));
    editor.clearSelection();
    editor.setShowPrintMargin(false);
    editor.focus();

    if (this.get('id') === 'output') {
      editor.setReadOnly(true);
      editor.setHighlightActiveLine(false);
      editor.setHighlightGutterLine(false);

      this.observe('value', value => {
        editor.setValue(value, -1); // move cursor to the start
      });
    } else {
      editor.on('change', () => {
        this.set({ value: editor.getValue() });
      });
    }
  },
};
