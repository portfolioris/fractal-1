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
    document.documentElement.addEventListener('click', this.hideFoldoutOnBlur);
    // todo: add fix if flyout is outside screen edges
    // this.correctOverflow();
    // todo: add flyout initial focus handler
    // if (this.$toggleFoldout.dataset.foldout__focus) {
    //   this.$el.querySelector(`#${this.$toggleFoldout.dataset.foldout__focus}`).focus();
    // }
  }

  correctOverflow() {
    this.observer = new IntersectionObserver((entries) => {
      console.log(entries[0].boundingClientRect, window.innerWidth);
      if (entries[0].boundingClientRect.x < 0) {
        this.$foldout.classList.add('is-offset-left');
      }

      if (entries[0].boundingClientRect.right > window.innerWidth) {
        console.log('offsetr');
        this.$foldout.classList.add('is-offset-right');
      }
    }, {
      threshold: 0.99,
    });

    this.observer.observe(this.$foldout);
  }

  closeFoldout() {
    this.$toggleFoldout.setAttribute('aria-expanded', 'false');
    this.$foldout.hidden = true;
    this.state.isOpen = false;
    this.$foldout.classList.remove('is-offset-left');
    this.$foldout.classList.remove('is-offset-right');
    document.documentElement.removeEventListener('click', this.hideFoldoutOnBlur);
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
}


export default ($el) => {
  const inst = new Flyout($el);
  inst.init();
};
