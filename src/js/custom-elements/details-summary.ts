export default class DetailsSummary extends HTMLElement {
  private isClosing: boolean;
  private isOpening: boolean;
  private transitionDuration: number;
  private isExpanding: boolean;
  private $details: HTMLDetailsElement;
  private $summary: HTMLElement;
  private animation: Animation;
  private timing: string;

  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.$details = this.closest('details') as HTMLDetailsElement;
    this.$summary = this.$details.querySelector('summary');
    this.animation = null;
    this.transitionDuration = parseFloat(window.getComputedStyle(this.$details).transitionDuration) * 1000;
    this.timing = window.getComputedStyle(this.$details).transitionTimingFunction;
    console.log(this.timing)
    this.isClosing = false;
    this.isOpening = false;
    this.$details.addEventListener('click', (e) => {
      e.preventDefault();
      this.open = !this.$details.open;
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

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'open') {
      if (newVal !== null) {
        this.openIt();
      } else {
        this.close();
      }
    }
  }

  openIt() {
    this.$details.style.overflow = 'hidden';
    // Apply a fixed height on the element
    // todo: use logical properties?
    this.$details.style.height = `${this.$summary.offsetHeight}px`;
    this.$details.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.$details.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.$summary.offsetHeight + this.offsetHeight}px`;

    // If there is already an animation running, cancel
    if (this.animation) {
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.$details.animate(
      { height: [startHeight, endHeight] },
      { duration: this.transitionDuration, easing: this.timing }
    );

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => {
      this.isExpanding = false;
    };
  }

  onAnimationFinish(open) {
    this.$details.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.$details.style.height = '';
    this.$details.style.overflow = '';
  }

  close() {
    this.isClosing = true;
    this.$details.style.overflow = 'hidden';
    // Store the current height of the element
    const startHeight = `${this.$details.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.$summary.offsetHeight}px`;
    // If there is already an animation running, cancel it
    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.$details.animate(
      { height: [startHeight, endHeight] },
      { duration: this.transitionDuration, easing: this.timing }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => {
      this.isClosing = false;
    };
  }
}
