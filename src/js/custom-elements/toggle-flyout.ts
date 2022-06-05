import { getKeyCode } from '../utilities';

export default class extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  private $toggler: HTMLButtonElement;

  private $foldout: HTMLElement;

  private observer: IntersectionObserver;

  constructor() {
    super();
    this.$toggler = this.querySelector('[aria-controls]');
    this.$foldout = this.querySelector(`#${this.$toggler.getAttribute('aria-controls')}`);
    this.hideFoldoutOnBlur = this.hideFoldoutOnBlur.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  connectedCallback() {
    this.$toggler.addEventListener('click', () => {
      this.open = !this.open;
    });
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

  attributeChangedCallback(name) {
    if (name === 'open') {
      if (this.open) {
        this.openFoldout();
      } else {
        this.closeFoldout();
      }
    }
  }

  openFoldout() {
    this.$toggler.setAttribute('aria-expanded', 'true');
    this.$foldout.hidden = false;
    this.correctOverflow();
    // after overflow is corrected
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.$foldout.classList.add('is-open');
      });
    });
    document.documentElement.addEventListener('click', this.hideFoldoutOnBlur);
    document.addEventListener('keyup', this.handleEscape);
  }

  correctOverflow() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].boundingClientRect.x < 0) {
          this.$foldout.classList.add('is-offset-inline-start');
        }

        if (entries[0].boundingClientRect.right > document.documentElement.clientWidth) {
          this.$foldout.classList.add('is-offset-inline-end');
        }
      },
      {
        threshold: 1,
      },
    );

    this.observer.observe(this.$foldout);
  }

  closeFoldout() {
    this.$toggler.setAttribute('aria-expanded', 'false');

    this.$foldout.addEventListener('transitionend', this.handleTransitionEnd);
    this.$foldout.classList.remove('is-open');
    document.documentElement.removeEventListener('click', this.hideFoldoutOnBlur);
    document.removeEventListener('keyup', this.handleEscape);
    this.observer.unobserve(this.$foldout);
  }

  handleTransitionEnd() {
    this.$foldout.hidden = true;
    this.$foldout.removeEventListener('transitionend', this.handleTransitionEnd);
    this.$foldout.classList.remove('is-offset-inline-start', 'is-offset-inline-end');
  }

  // hide foldout when clicking outside the component
  hideFoldoutOnBlur(e) {
    if (!this.contains(e.target)) {
      this.open = false;
    }
  }

  handleEscape(e) {
    const keyCode = getKeyCode(e);

    if (keyCode === 'esc' || keyCode === 'escape') {
      this.open = false;
    }
  }
}
