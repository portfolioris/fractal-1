import { css, LitElement } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';

import cross from '../../svg/icon-cross.svg';
// import cross from '../../svg/icon-cross.svg?raw';

const icons = {
  cross,
};

class CIcon extends LitElement {
  @property({ type: String }) icon = '';

  static styles = css`
    .c-icon {
      display: block;
      inline-size: var(--base-line-height);
      block-size: var(--base-line-height);
      fill: currentColor;
    }
  `;

  render() {
    // ${unsafeStatic(icons[this.icon])}
    return html`
      <svg
        class="c-icon"
        aria-hidden="true"
      >
        <use href="/dist/sprite.svg#icon-${this.icon}" />
      </svg>


    `;
  }
}

customElements.define('c-icon', CIcon);
