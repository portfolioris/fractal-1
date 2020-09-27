// TODO: move into utilities
const getKeyCode = (e) => {
  let code = '';

  if (e.key !== undefined) {
    code = e.key;
  } else if (e.keyIdentifier !== undefined) {
    code = e.keyIdentifier;
  } else if (e.keyCode !== undefined) {
    code = e.keyCode;
  }

  return code.toLowerCase();
};

class Tabs {
  constructor($el) {
    this.state = {
      activePanelId: null,
    };

    // cache elements
    this.$el = $el;
    this.$tabs = this.$el.querySelectorAll('[data-module-bind=tabs-tab]');
    this.$tabsExpanded = this.$el.querySelectorAll('[data-module-bind=tabs-tab-expanded]');
    this.$panels = this.$el.querySelectorAll('[data-module-bind=tabs-panel]');
  }

  init() {
    // bind click + key events to tabs
    Array.from(this.$tabs).forEach(($tab) => {
      $tab.addEventListener('click', (e) => this.handleClickTab(e));
      $tab.addEventListener('keydown', (e) => this.handleKeyDownTab(e));
      $tab.addEventListener('keyup', (e) => this.handleKeyUpTab(e));
    });

    // bind click + key events to expanded tabs
    Array.from(this.$tabsExpanded).forEach(($tab) => {
      $tab.addEventListener('click', (e) => this.handleClickTab(e));
      $tab.addEventListener('keydown', (e) => this.handleKeyDownTab(e));
      $tab.addEventListener('keyup', (e) => this.handleKeyUpTab(e));
    });

    this.activateFirstTab(false);
  }

  // activate panel on click tab
  handleClickTab(event) {
    this.activatePanel(event.currentTarget.getAttribute('aria-controls'));
  }

  activatePanel(panelId, setFocus = true) {
    this.deactivateTabs();

    const $activePanel = Array.from(this.$panels).find(($panel) => $panel.id === panelId);
    this.state.activePanelId = $activePanel.id;

    // lookup tab to activate
    const $tabToActivate = Array.from(this.$tabs).find(($tab) => $tab.getAttribute('aria-controls') === this.state.activePanelId);

    // activate 'palm' tab
    $tabToActivate.removeAttribute('tabindex');
    $tabToActivate.setAttribute('aria-selected', 'true');

    // lookup tab expanded to activate
    const $tabExpandedToActivate = Array.from(this.$tabsExpanded).find(($tab) => $tab.getAttribute('aria-controls') === this.state.activePanelId);

    // activate 'desk' tab
    $tabExpandedToActivate.removeAttribute('tabindex');
    $tabExpandedToActivate.setAttribute('aria-selected', 'true');

    // activate panel
    $activePanel.hidden = false;

    if (!setFocus) {
      return;
    }

    // set focus if interacted (not by initial activation of first tab)
    $tabToActivate.focus();
  }

  deactivateTabs() {
    Array.from(this.$tabs).forEach(($tab) => {
      $tab.setAttribute('tabindex', '-1');
      $tab.setAttribute('aria-selected', 'false');
    });

    Array.from(this.$tabsExpanded).forEach(($tab) => {
      $tab.setAttribute('tabindex', '-1');
      $tab.setAttribute('aria-selected', 'false');
    });

    Array.from(this.$panels).forEach(($panel) => {
      $panel.hidden = true;
    });
  }

  activateFirstTab(setFocus = true) {
    this.activatePanel(this.$panels[0].id, setFocus);
  }

  // controls to jump to first/last tab by pressing home/end keys
  handleKeyDownTab(event) {
    const keyCode = getKeyCode(event);
    switch (keyCode) {
      case 'home':
        event.preventDefault();
        this.activateFirstTab(true);
        break;
      case 'end':
        event.preventDefault();
        this.activatePanel(this.$panels[this.$panels.length - 1].id);
        break;
      default:
        break;
    }
  }

  // controls to go to previous/next tab by pressing left/right keys
  handleKeyUpTab(event) {
    const currentPanel = Array.from(this.$panels).find(
      ($panel) => $panel.id === this.state.activePanelId,
    );
    const currentTabIndex = Array.from(this.$panels).indexOf(currentPanel);

    const keyCode = getKeyCode(event);
    switch (keyCode) {
      case 'left':
      case 'arrowleft':
      case 'up':
      case 'arrowup':
        if (currentTabIndex - 1 >= 0) {
          this.activatePanel(this.$panels[currentTabIndex - 1].id);
        }
        break;
      case 'right':
      case 'arrowright':
      case 'down':
      case 'arrowdown':
        // go to next tab
        if (currentTabIndex + 1 < this.$panels.length) {
          this.activatePanel(this.$panels[currentTabIndex + 1].id);
        }
        break;
      default:
        break;
    }
  }
}


// bind main function to $el (<div data-module="ui/tabs" data-context="@visible">)
export default ($el) => {
  const inst = new Tabs($el);
  inst.init();
};
