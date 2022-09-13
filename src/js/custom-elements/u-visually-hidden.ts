import { LitElement, unsafeCSS } from 'lit';
import styles from '@supple-kit/supple-css/utilities/visually-hidden/_index.scss';
import { html } from 'lit-html';

class UVisuallyHidden extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`<span class="u-visually-hidden"><slot></slot></span>`;
  }
}

customElements.define('u-visually-hidden', UVisuallyHidden);
