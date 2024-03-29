import { $, $$ } from '../utilities';

class Modal {
  constructor($el) {
    this.state = {
      $opener: null,
    };

    this.$el = $el;
    this.$page = $(document, '[data-module-bind=modal-page]');
    this.$modal = $(this.$el, '[data-module-bind=modal-modal]');
    this.$openBtns = $$(this.$el, '[data-module-bind=modal-open]');
    this.$closeBtns = $$(this.$el, '[data-module-bind=modal-close]');
    this.$focusEl = $(this.$el, '[data-module-bind=modal-gets-focus]');

    this.handleEscape = this.handleEscape.bind(this);
  }

  init() {
    this.initModal();
    this.handleClickOpen();
    this.handleClickClose();
  }

  // moves the html to the bottom of the page, so it can overlay the rest
  initModal() {
    this.$modal.setAttribute('role', 'dialog');
    this.$modal.setAttribute('aria-modal', 'true');
    this.$modal.setAttribute('aria-hidden', 'true');
    this.$modal.hidden = true;
    document.body.appendChild(this.$modal);
  }

  handleClickOpen() {
    [...this.$openBtns].forEach(($openBtn) => {
      $openBtn.addEventListener('click', () => {
        this.state.$opener = $openBtn;
        this.openModal();
      });
    });
  }

  handleClickClose() {
    [...this.$closeBtns].forEach(($closeBtn) => {
      $closeBtn.addEventListener('click', () => {
        this.closeModal();
      });
    });
  }

  handleEscape(e) {
    const key = e.which || e.keyCode;

    if (key === 27) {
      this.closeModal();
    }
  }

  openModal() {
    [...this.$openBtns].forEach(($openBtn) => {
      $openBtn.setAttribute('aria-expanded', 'true');
    });
    this.$modal.setAttribute('aria-hidden', 'false');
    this.$modal.hidden = false;
    this.$page.inert = true;
    document.addEventListener('keyup', this.handleEscape);

    // set focus to primary cta
    if (this.$focusEl) {
      this.$focusEl.focus();
    }
  }

  closeModal() {
    [...this.$openBtns].forEach(($openBtn) => {
      $openBtn.setAttribute('aria-expanded', 'false');
    });
    this.$modal.setAttribute('aria-hidden', 'true');
    this.$modal.hidden = true;
    this.$page.inert = false;
    document.removeEventListener('keyup', this.handleEscape);
    // restore focus on modal opener
    this.state.$opener.focus();
  }
}

export default ($el) => {
  const inst = new Modal($el);
  inst.init();
};
