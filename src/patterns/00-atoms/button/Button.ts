import { html } from 'lit-html';

export const Button = ({ element = 'button', type, href, label, icon }) => {
  return html`
 <${element}
   class="c-button  ${icon ? 'c-button--has-icon' : null}"
   type="${type}"
    href="${href}"
  >${label} ${icon}</${element}> `;
};
