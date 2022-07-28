'use babel';

import DemoSlotGratisView from './demo-slot-gratis-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotGratisView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotGratisView = new DemoSlotGratisView(state.demoSlotGratisViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotGratisView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-gratis:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotGratisView.destroy();
  },

  serialize() {
    return {
      demoSlotGratisViewState: this.demoSlotGratisView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotGratis was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
