import { $, getKeyCode } from '../utilities';

/**
 * Flyout
 * Generic system for a toggle button and overlapping foldout (flyout)
 *
 * <div data-module="ui/flyout" data-context="@visible">
 *    <button data-module-bind="flyout-toggle" aria-controls="flyout" aria-expanded="false" />
 *    <div data-module-bind="flyout-panel" id="flyout" />
 *  </div>
 * @param $el
 */

class Flyout {
  private isOpen: boolean;
  private $el: HTMLElement;
  private $toggleFoldout: HTMLButtonElement;
  private $foldout: HTMLElement;
  private observer: IntersectionObserver;

  constructor($el: HTMLElement) {
    this.isOpen = false;
    this.$el = $el;
    this.$toggleFoldout = $(this.$el, '[data-module-bind=flyout-toggle]');
    this.$foldout = $(this.$el, '[data-module-bind=flyout-panel]');
    this.hideFoldoutOnBlur = this.hideFoldoutOnBlur.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  init(): void {
    this.handleClickToggleFoldout();
    this.$toggleFoldout.setAttribute('aria-expanded', 'false');
  }

  // methods
  openFoldout() {
    this.$toggleFoldout.setAttribute('aria-expanded', 'true');
    this.$foldout.hidden = false;
    this.isOpen = true;
    document.documentElement.addEventListener('click', this.hideFoldoutOnBlur);
    document.addEventListener('keyup', this.handleEscape);
    this.correctOverflow();
    // after overflow is corrected
    requestAnimationFrame(() => {
      this.$foldout.classList.add('is-open');
    });
  }

  correctOverflow() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].boundingClientRect.x < 0) {
          this.$foldout.classList.add('is-offset-inline-start');
        }

        if (entries[0].boundingClientRect.right > document.documentElement.clientWidth) {
          this.$foldout.classList.add('is-offset-inline-end');
          this.$foldout.style.setProperty(
            '--offset',
            String(entries[0].boundingClientRect.right - document.documentElement.clientWidth)
          );
        }
      },
      {
        threshold: 1,
      }
    );

    this.observer.observe(this.$foldout);
  }

  closeFoldout() {
    this.$toggleFoldout.setAttribute('aria-expanded', 'false');

    this.$foldout.addEventListener('transitionend', this.handleTransitionEnd);
    this.$foldout.classList.remove('is-open');

    this.isOpen = false;
    document.documentElement.removeEventListener('click', this.hideFoldoutOnBlur);
    document.removeEventListener('keyup', this.handleEscape);
    this.observer.unobserve(this.$foldout);
  }

  handleTransitionEnd() {
    this.$foldout.hidden = true;
    this.$foldout.removeEventListener('transitionend', this.handleTransitionEnd);
    this.$foldout.style.setProperty('--offset', String(0));
    this.$foldout.classList.remove('is-offset-inline-start', 'is-offset-inline-end');
  }

  handleClickToggleFoldout() {
    this.$toggleFoldout.addEventListener('click', () => {
      if (!this.isOpen) {
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
  new Flyout($el).init();
};
