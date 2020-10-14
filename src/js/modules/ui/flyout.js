import { getKeyCode } from '../../utilities';

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
    this.handleEscape = this.handleEscape.bind(this);
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
    document.documentElement.addEventListener('click', this.hideFoldoutOnBlur);
    document.addEventListener('keyup', this.handleEscape);
    this.correctOverflow();
    // todo: add flyout initial focus handler
    // if (this.$toggleFoldout.dataset.foldout__focus) {
    //   this.$el.querySelector(`#${this.$toggleFoldout.dataset.foldout__focus}`).focus();
    // }
  }

  correctOverflow() {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].boundingClientRect.x < 0) {
        this.$foldout.classList.add('is-offset-inline-start');
      }

      if (entries[0].boundingClientRect.right > document.documentElement.clientWidth) {
        this.$foldout.classList.add('is-offset-inline-end');
        this.$foldout.style.setProperty('--offset', entries[0].boundingClientRect.right - document.documentElement.clientWidth);
      }
    }, {
      threshold: 1,
    });

    this.observer.observe(this.$foldout);
  }

  closeFoldout() {
    this.$toggleFoldout.setAttribute('aria-expanded', 'false');
    this.$foldout.hidden = true;
    this.state.isOpen = false;
    this.$foldout.classList.remove('is-offset-inline-start');
    this.$foldout.classList.remove('is-offset-inline-end');
    document.documentElement.removeEventListener('click', this.hideFoldoutOnBlur);
    document.removeEventListener('keyup', this.handleEscape);
    this.observer.unobserve(this.$foldout);
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

  handleEscape(e) {
    const keyCode = getKeyCode(e);

    if (keyCode === 'esc' || keyCode === 'escape') {
      this.closeFoldout();
    }
  }
}


export default ($el) => {
  const inst = new Flyout($el);
  inst.init();
};
