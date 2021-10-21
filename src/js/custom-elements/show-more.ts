export default class ShowMore extends HTMLElement {
  private $toggler: HTMLButtonElement;
  private $togglerLabel: HTMLElement;
  private $container: HTMLElement;
  private readonly $content: HTMLElement;
  private $divider: HTMLElement;
  private readonly showLessLabel: string;
  private readonly showMoreLabel: string;

  constructor() {
    super();
    this.$container = this.querySelector('[data-show-more-container]');
    this.$content = this.querySelector('[data-show-more-content]');
    this.$divider = this.querySelector('[data-show-more-divider]');
    this.$toggler = this.querySelector('[data-show-more-btn]');
    this.$togglerLabel = this.$toggler.querySelector('[data-btn-label]');
    this.showLessLabel = this.$toggler.dataset.labelShowLess;
    this.showMoreLabel = this.$toggler.dataset.labelShowMore;
  }

  static get observedAttributes() {
    return ['open'];
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get height() {
    return parseInt(this.getAttribute('height'));
  }

  getBodyRem() {
    // get the rem to multiply the computed values to user preference
    const compStyles = window.getComputedStyle(document.documentElement);
    return parseFloat(compStyles.getPropertyValue('font-size')) / 16;
  }

  connectedCallback() {
    // check initial setting
    if (this.open) {
      this.showMore();
    } else {
      this.showLess();
    }
    // watch for screen size etc. changes
    this.observeHeight();
    // handle toggle
    this.$toggler.addEventListener('click', () => {
      this.open = !this.open;
    });
  }

  observeHeight() {
    new ResizeObserver(($entries) => {
      $entries.forEach(($entry) => {
        // if the block is higher than the allowed size (in rem), show the divider
        this.$divider.hidden = $entry.borderBoxSize[0].blockSize <= this.height * this.getBodyRem() * 16;
      });
    }).observe(this.$content);
  }

  showMore() {
    const endHeight = this.$content.getBoundingClientRect().height;
    this.$container.addEventListener('transitionend', () => {
      this.$container.style.height = '';
    })
    this.$container.style.height = `${endHeight}px`;

    // this.$container.style.height = 'auto';
    this.$togglerLabel.innerHTML = this.showLessLabel;
    this.$toggler.setAttribute('aria-expanded', 'true');
  }

  showLess() {
    this.$container.style.height = `${this.$content.getBoundingClientRect().height}px`;

    this.$container.style.height = `${this.height * this.getBodyRem()}rem`;
    this.$container.style.overflow = 'hidden';
    this.$togglerLabel.innerHTML = this.showMoreLabel;
    this.$toggler.setAttribute('aria-expanded', 'false');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'open') {
      if (newVal !== null) {
        this.showMore();
      } else {
        this.showLess();
      }
    }
  }
}
