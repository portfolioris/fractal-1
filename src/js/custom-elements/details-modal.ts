import { LitElement } from 'lit';

export default class DetailsModal extends LitElement {

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
