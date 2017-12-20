import Component from '@ember/component';
import { get, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import layout from '../templates/components/mdc-dialog';

export default Component.extend({
  layout,
  show: true,
  tagName: 'aside',
  classNames: ['mdc-dialog'],
  attributeBindings: ['role', 'aria-labelledby', 'aria-describedby'],

  _mdcComponent: null,

  didInsertElement() {
    this._super(...arguments);
    let dialog = new mdc.dialog.MDCDialog(get(this, 'element'));
    set(this, '_mdcComponent', dialog);

    if (get(this, 'show')) {
      dialog.show();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);
    let dialog = get(this, '_mdcComponent');

    if (get(this, 'show')) {
      dialog.show();
    } else {
      dialog.close();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    get(this, '_mdcComponent').destroy();
  },

  accept() {},
  cancel() {},
  'click-backdrop': reads('cancel')
});