import { $ } from '../utilities';

class Accordeon {
  constructor($el) {
    this.$el = $el;
    this.$summary = $(this.$el, '[data-module-bind=accordeon-summary]');
    this.$content = $(this.$el, '[data-module-bind=accordeon-container]');
    this.animation = null;
    this.isClosing = false;
    this.isOpening = false;
    this.transitionDuration =
      parseFloat(window.getComputedStyle(this.$content).transitionDuration) * 1000;
  }

  init() {
    this.$summary.addEventListener('click', (e) => {
      e.preventDefault();
      this.$el.style.overflow = 'hidden';

      if (!this.$el.open) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  open() {
    // Apply a fixed height on the element
    this.$el.style.height = `${this.$el.offsetHeight}px`;
    this.$el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.$el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.$summary.offsetHeight + this.$content.offsetHeight}px`;

    // If there is already an animation running, cancel
    if (this.animation) {
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.$el.animate(
      { height: [startHeight, endHeight] },
      { duration: this.transitionDuration }
    );
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => {
      this.isExpanding = false;
    };
  }

  onAnimationFinish(open) {
    this.$el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.$el.style.height = '';
    this.$el.style.overflow = '';
  }

  close() {
    this.isClosing = true;
    // Store the current height of the element
    const startHeight = `${this.$el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.$summary.offsetHeight}px`;
    // If there is already an animation running, cancel it
    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.$el.animate(
      { height: [startHeight, endHeight] },
      { duration: this.transitionDuration }
    );

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => {
      this.isClosing = false;
    };
  }
}

export default ($el) => {
  const inst = new Accordeon($el);
  inst.init();
};
