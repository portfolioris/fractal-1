/**
 * Flyout
 * Generic system for a toggle button and overlapping foldout (flyout)
 *
 * <div data-module="ui/flyout" data-context="@visible">
 *
 *    <button data-module-bind="flyout-toggle" aria-controls="flyout" aria-expanded="false" />
 *
 *     <div data-module-bind="flyout-panel" id="flyout" />
 *
 *  </div>
 * @param $el
 */

class Flyout {
  constructor($el) {
    this.state = {
      isOpen: false,
    };

    this.$el = $el;
    this.$toggleFoldout = this.$el.querySelector(' [data-module-bind=flyout-toggle]');
    this.$foldout = this.$el.querySelector('[data-module-bind=flyout-panel]');
    this.hideFoldoutOnBlur = this.hideFoldoutOnBlur.bind(this);
  }

  init() {
    this.handleClickToggleFoldout();
    this.$toggleFoldout.setAttribute('aria-expanded', 'false');
  }

  // methods
  openFoldout() {
    this.$toggleFoldout.setAttribute('aria-expanded', 'true');
    this.$foldout.hidden = false;
    this.state.isOpen = true;
    // setTimeout(() => {
    document.documentElement.addEventListener('click', this.hideFoldoutOnBlur);
    // if (this.$toggleFoldout.dataset.foldout__focus) {
    //   this.$el.querySelector(`#${this.$toggleFoldout.dataset.foldout__focus}`).focus();
    // }
    // }, 0);
  }

  closeFoldout() {
    this.$toggleFoldout.setAttribute('aria-expanded', 'false');
    this.$foldout.hidden = true;
    this.state.isOpen = false;
    document.documentElement.removeEventListener('click', this.hideFoldoutOnBlur);
  }

  handleClickToggleFoldout() {
    this.$toggleFoldout.addEventListener('click', () => {
      if (!this.state.isOpen) {
        this.openFoldout();
      } else {
        this.closeFoldout();
      }
    });
  }

  // hide foldout when clicking outside the component
  hideFoldoutOnBlur(e) {
    if (!this.$el.contains(e.target)) {
      this.closeFoldout();
    }
  }
}


export default ($el) => {
  const inst = new Flyout($el);
  inst.init();
};