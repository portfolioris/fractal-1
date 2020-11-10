import { $ } from '../../utilities';

class Accordeon {
  constructor($el) {
    this.$el = $el;
    this.$summary = $($el, '[data-module-bind=accordeon-summary]');
    this.$container = $(this.$el, '[data-module-bind=accordeon-container]');
    this.$content = $(this.$el, '[data-module-bind=accordeon-content]');

    this.removeTransitionOpen = this.removeTransitionOpen.bind(this);
    this.removeTransitionClose = this.removeTransitionClose.bind(this);
  }

  init() {
    this.addEventListeners();
    this.$el.classList.add('is-initialized');
  }

  addEventListeners() {
    this.$summary.addEventListener('click', (e) => {
      e.preventDefault();

      if (!this.$el.open) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  open() {
    this.$el.setAttribute('open', 'open');
    this.$el.classList.add('is-open');
    const dims = this.$content.getBoundingClientRect();
    this.$container.addEventListener('transitionend', this.removeTransitionOpen);
    this.$container.style.height = `${dims.height}px`;
  }

  removeTransitionOpen() {
    this.$container.style.height = 'auto';
    this.$container.removeEventListener('transitionend', this.removeTransitionOpen);
  }

  close() {
    const dims = this.$content.getBoundingClientRect();
    this.$container.style.height = `${dims.height}px`;
    this.$el.classList.remove('is-open');

    window.requestAnimationFrame(() => {
      this.$container.addEventListener('transitionend', this.removeTransitionClose);

      window.requestAnimationFrame(() => {
        this.$container.style.height = '0';
      });
    });
  }

  removeTransitionClose() {
    this.$container.removeEventListener('transitionend', this.removeTransitionClose);
    this.$el.removeAttribute('open');
  }
}

export default ($el) => {
  const inst = new Accordeon($el);
  inst.init();
};
