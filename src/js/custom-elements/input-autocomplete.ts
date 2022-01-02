import { LitElement, html } from 'lit';
// eslint-disable-next-line import/extensions
import { property, state } from 'lit/decorators.js';
import { getKeyCode, fuzzyMatchStringInArray } from '../utilities';

export default class InputAutocomplete extends LitElement {
  @property() name?: string = '';

  @property() inputClass?: string = '';

  @state() showMenu?: boolean = false;

  private $select: HTMLSelectElement;

  private $input: HTMLInputElement;

  private getSelectMatches(query) {
    if (query === '') {
      const { options } = this.$select;
      options.remove(0); // remove first option
      return options;
    }

    return fuzzyMatchStringInArray(query, this.$select.options);
  }

  render() {
    this.setupEnhancement();
    this.handleInputEvents();
    // const options = this.getSelectMatches('');
    // console.log(options);

    return html`
      <slot hidden name="select"></slot>

      <slot name="input"></slot>

      <div aria-live="polite" role="status" hidden>
        <span data-autocomplete-amount>0</span> results.
      </div>
    `;
  }

  setupEnhancement(): void {
    // make <select> unusable
    const selectSlot = this.querySelector('[slot="select"]') as HTMLElement;
    this.$select = selectSlot.querySelector('select');
    this.$select.removeAttribute('id');
    this.$select.setAttribute('tabindex', '-1');
    // replace <select> with <input>, set attributes
    const inputSlot = this.querySelector('[slot="input"]') as HTMLElement;
    inputSlot.hidden = false;
    this.$input = inputSlot.querySelector('input');
    // this.$input.setAttribute('aria-owns', `autocomplete-${this.name}-options`);
    // this.$input.setAttribute('aria-autocomplete', 'list');
    // this.$input.setAttribute('aria-expanded', 'false');
    // this.$input.setAttribute('role', 'combobox');
    // this.$input.type = 'search';
    // this.$input.autocomplete = 'off';
    // this.$input.id = this.name;
    // this.$input.autocapitalize = 'none';
    // setup list
    const $list = this.querySelector('[slot="list"]') as HTMLElement;
    // const $list = listSlot.querySelector('ul') as HTMLUListElement;
    $list.hidden = true;
    $list.setAttribute('role', 'listbox');
    $list.id = `autocomplete-${this.name}-options`;
    const $option = $list.querySelector('li') as HTMLLIElement;
    $option.hidden = true;
    $option.setAttribute('role', 'option');
    $option.setAttribute('tabindex', '-1');
    $option.setAttribute('aria-selected', 'false');
  }

  handleInputEvents(): void {
    // if tab out, hide the menu
    this.$input.addEventListener('keydown', (e) => {
      const keyCode = getKeyCode(e);
      if (keyCode === 'tab') {
        // this.hideMenu();
        this.showMenu = false;
      }
    });

    this.$input.addEventListener('keyup', (e) => {
      const keyCode = getKeyCode(e);
      switch (keyCode) {
        // ignore these keys, old & new spec names
        case 'esc':
        case 'escape':
        case 'up':
        case 'arrowup':
        case 'left':
        case 'arrowleft':
        case 'right':
        case 'arrowright':
        case 'space':
        case ' ':
        case 'enter':
        case 'shift':
        case 'tab':
          break;
        // on arrow down, jump to the list
        case 'arrowdown':
        case 'down':
          this.handleInputKeyPressDown();
          break;
        // otherwise, handle typing
        default:
          this.handleTyping();
      }
    });

    this.$input.addEventListener('focus', () => {
      let query = '';

      if (this.apiUrl) {
        query = this.$input.value;
      }

      if (query.length < this.queryMinLength) {
        return;
      }

      this.getMatches(query).then((options) => {
        this.buildMenu(options);
        this.showMenu();
      });
    });
  }
}
