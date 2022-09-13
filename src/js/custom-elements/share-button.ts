import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import {templateContent} from 'lit/directives/template-content.js';

export default class ShareButton extends LitElement {
  @state() canShare?: boolean = true;
  @state() message?: string = '';
  @property() successMessage?: string = 'Page successfully shared.'
  @property() errorMessage?: string = 'An error occurred.'

  connectedCallback() {
    super.connectedCallback();

    if (!navigator.canShare) {
      this.canShare = false;
      const $fallback = this.querySelector('[data-fallback]');
      console.log($fallback);
      this.$fallback = $fallback;
    }
  }

  async handleClickShare() {
    const shareData = {
      title: 'Fractal 1',
      text: 'Web share test.',
      url: window.location.href,
    };

    try {
      await navigator.share(shareData);
      this.message = this.successMessage;
    } catch (err) {
      this.message = this.errorMessage;
      console.error(err);
    }
  }

  render() {
    if (this.canShare) {
      return html`
        <button type="button" @click="${this.handleClickShare}">Share this page</button>
        <p>${this.message}</p>
      `;
    } else {
      return html`
        <p>Old skool sharing links.</p>
        ${templateContent(this.$fallback)}
      `;
    }
  }
}
