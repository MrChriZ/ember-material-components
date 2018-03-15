import MDCBase from './-mdc-base';
import { get } from '@ember/object';
import { MDCTab } from '@material/tabs';
import layout from '../templates/components/mdc-tab';

export default MDCBase.extend({
  layout,
  mdcClass: MDCTab,
  tagName: 'a',
  route:null,
  index:null,
  isActive: false,
  isIconTabWithText: false,
  preventDefaultOnClick: true,
  classNames: ['mdc-tab'],
  classNameBindings: [
    'isActive:mdc-tab--active',
    'isIconTabWithText:mdc-tab--with-icon-and-text'
  ],
  attributeBindings: ['href'],

  didUpdate() {
    this._super(...arguments);
    let tab = get(this, '_mdcComponent');
    tab && this.bindListeners(tab)
  },
  didReceiveAttrs() {
    this._super(...arguments);
    const route = Ember.get(this,'route');
    const index = Ember.get(this,'index');
    if (index && route && route==Ember.getOwner(this).lookup('router:main').get('currentRouteName'))
    {
      this.set('isActive', true);
      this.parentView.setTab(index,this);
    }
    
  },

  bindListeners(mdcComponent) {
    mdcComponent.listen('MDCTab:selected', get(this, 'selected'));
  },

  updateElement(mdcComponent) {
    mdcComponent.isActive = !!get(this, 'isActive');
    mdcComponent.preventDefaultOnClick = !!get(this, 'preventDefaultOnClick');
  },

  selected() {}
});
