import { $, $$ } from '../../utilities';

class Slider {
  constructor($el) {
    this.state = {
      isOpen: false,
    };

    this.$slider = $($el, '[data-module-bind=slider-slider]');
    this.$slidesList = $($el, '[data-module-bind=slider-list]');
    this.$slides = $$($el, '[data-module-bind=slider-slide]');
    this.$buttonPrevious = $($el, '[data-module-bind=slider-previous]');
    this.$buttonNext = $($el, '[data-module-bind=slider-next]');

    this.disable = this.disable.bind(this);
  }

  init() {
    this.addEventListeners();
    this.observeSlides();
  }

  observeSlides() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.remove('is-visible');
          const a = entry.target.querySelector('a');
          a.setAttribute('tabindex', '-1'); // (1)
          if (!entry.intersectionRatio > 0) {
            return;
          }

          entry.target.classList.add('is-visible');
          a.removeAttribute('tabindex'); // (2)
        });
      },
      {
        root: this.$slider,
      }
    );

    [...this.$slides].forEach(($slide) => {
      observer.observe($slide);
    });
  }

  disable() {
    this.$buttonPrevious.disabled = this.$slider.scrollLeft < 1;
    this.$buttonNext.disabled =
      this.$slider.scrollLeft === this.$slidesList.scrollWidth - this.$slidesList.offsetWidth;
    // prev.disabled = gallery.scrollLeft < 1;
    // next.disabled = gallery.scrollLeft === list.scrollWidth - list.offsetWidth;
  }

  addEventListeners() {
    let debounced;

    this.$slider.addEventListener('scroll', () => {
      window.clearTimeout(debounced);
      debounced = setTimeout(this.disable, 200);
    });
  }
}

export default ($el) => {
  const inst = new Slider($el);
  inst.init();
};
