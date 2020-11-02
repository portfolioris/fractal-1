import { $ } from '../../utilities';

class ShowMore {
  constructor($el) {
    this.state = {
      isOpen: false,
    };

    this.$el = $el;
    this.$trigger = $(this.$el, '[data-module-bind=show-more-btn]');
    this.$triggerLabel = $(this.$trigger, '[data-module-bind=btn-label]');
    this.$container = $(this.$el, '[data-module-bind=show-more-container]');
    this.$content = $(this.$el, '[data-module-bind=show-more-content]');
    this.$divider = $(this.$el, '[data-module-bind=show-more-divider]');
    this.allowedHeight = this.$el.dataset.allowedHeight;
    this.showLessLabel = this.$trigger.dataset.labelShowLess;
    this.showMoreLabel = this.$trigger.dataset.labelShowMore;
  }

  init() {
    this.checkHeight();
    this.handleClick();
  }

  handleClick() {
    this.$trigger.addEventListener('click', () => {
      if (!this.state.isOpen) {
        this.showMore();
        return;
      }

      this.showLess();
    });
  }

  checkHeight() {
    const resizeObserver = new ResizeObserver(($entries) => {
      $entries.forEach(($entry) => {
        // get the rem to multiply the computed values to user preference
        const compStyles = window.getComputedStyle(document.documentElement);
        this.bodyRem = compStyles.getPropertyValue('font-size').replace('px', '') / 16;

        // if the block is higher than the allowed size (in px)
        if ($entry.borderBoxSize.blockSize > this.allowedHeight * this.bodyRem) {
          this.showDivider();
        } else {
          this.hideDivider();
        }
      });
    });

    resizeObserver.observe(this.$content);
  }

  showDivider() {
    this.$divider.hidden = false;
    this.showLess();
  }

  hideDivider() {
    this.$divider.hidden = true;
    this.showMore();
  }

  showMore() {
    this.$container.style.height = 'auto';
    this.state.isOpen = true;
    this.$triggerLabel.innerHTML = this.showLessLabel;
    this.$trigger.setAttribute('aria-expanded', 'true');
  }

  showLess() {
    this.$container.style.height = `${this.allowedHeight * this.bodyRem}px`;
    this.state.isOpen = false;
    this.$triggerLabel.innerHTML = this.showMoreLabel;
    this.$trigger.setAttribute('aria-expanded', 'false');
  }
}

export default ($el) => {
  const inst = new ShowMore($el);
  inst.init();
};
