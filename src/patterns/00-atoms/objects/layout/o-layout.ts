import {
  html, LitElement, unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import layout from './_layout.scss';

export default class OLayout extends LitElement {
  @property({ type: Boolean }) fit = false;

  @property({ type: Boolean }) justify = false;

  @property({ type: String }) gap = null;

  @property({ type: String }) role = null;

  @property({ type: String }) alignblock = null;

  static styles = unsafeCSS(layout);

  render() {
    const classes = {
      'o-layout--fit': this.fit,
      'o-layout--gap-tiny': this.gap === 'tiny',
      'o-layout--gap-small': this.gap === 'small',
      'o-layout--gap-base': this.gap === 'base',
      'o-layout--gap-large': this.gap === 'large',
      'o-layout--gap-huge': this.gap === 'huge',
      'o-layout--fit  o-layout--justify': this.justify,
      'o-layout--align-block-center': this.alignblock === 'center',
    };

    return html` <div
      role=${ifDefined(this.role)}
      class="o-layout  ${classMap(classes)}"
    >
      <slot></slot>
    </div>`;
  }
}
