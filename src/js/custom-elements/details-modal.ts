import {
  css, html, LitElement, unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
// import styles from '@supple-kit/supple-css/generic/reset/_index.scss';
import styles from '../../patterns/01-molecules/modal/_modal.scss';

export default class DetailsModal extends LitElement {
  @property({ type: String }) id = '';

  @property({ type: String }) heading = '';

  @property({ type: Boolean }) open = false;

  @property({ type: HTMLDialogElement }) $modal = null;

  constructor() {
    super();
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
  }

  static styles = unsafeCSS(styles);

  connectedCallback() {
    super.connectedCallback();
    document.documentElement.addEventListener('click', this.handleClickOpen);
  }

  protected firstUpdated() {
    this.$modal = this.renderRoot.querySelector('dialog');
    if (this.open) {
      this.openModal();
    }
  }

  dismissModal(e) {
    if (e.target.nodeName === 'DIALOG') {
      this.closeModal();
    }
  }

  handleClickOpen(e) {
    if (e.target.closest(`[aria-controls='${this.id}']`)) {
      this.openModal();
    }
  }

  openModal() {
    this.$modal.showModal();
  }

  closeModal() {
    this.$modal.close();
  }

  async dialogClose(e) {
    console.log(e);
    // setTimeout(() => {})
  }

  render() {
    return html`
      <dialog class="c-modal" @click="${this.dismissModal}" @close="${this.dialogClose}">
        <header class="c-modal__header">
          <o-layout gap="base" justify alignblock="center">
            <h3>${this.heading}</h3>
            <button
              title="Close dialog"
              type="button"
              class="o-button-clean  c-modal__close"
              @click="${this.closeModal}"
            >
              <c-icon icon="cross"></c-icon>
              <u-visually-hidden>Close dialog</u-visually-hidden>
            </button>
          </o-layout>
        </header>

        <main class="c-modal__content">
          <slot></slot>
        </main>
      </dialog>
    `;
  }
}
/*
export default class DetailsModal extends HTMLElement {
  private $details: HTMLDetailsElement;
  private $page: HTMLElement;
  private $togglers: NodeListOf<HTMLButtonElement>;
  private $focusEl: HTMLButtonElement | HTMLLinkElement;

  constructor() {
    super();
    this.hidden = true;
    // rest of the page will become inert
    this.$page = document.querySelector('[data-modal-page]');
    // parent <details> element
    this.$details = this.closest('details');
    // overlay, cross, cancel btn
    this.$togglers = this.querySelectorAll('[data-modal-close]');
    // optionally, main button in modal to set focus to
    this.$focusEl = this.querySelector('[data-modal-focus]');
    // open button
    this.$details.addEventListener('toggle', () => { this.toggle() });
    // close buttons
    this.$togglers.forEach(($toggler) => {
      $toggler.addEventListener('click', () => {
        this.$details.open = !this.$details.open;
      });
    });
    // move modal outside 'page', which will become inert
    document.body.appendChild(this);
  }

  toggle() {
    if (this.$details.open) {
      this.$page.setAttribute('inert', '');
      this.hidden = false;
      if (this.$focusEl) {
        this.$focusEl.focus();
      }
    } else {
      this.$page.removeAttribute('inert');
      this.hidden = true;
      this.$details.focus();
    }
  }
}
*/
