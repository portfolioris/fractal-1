import { getKeyCode, fuzzyMatchStringInArray } from '../../utilities';

class Autocomplete {
  constructor($el) {
    this.state = {
      options: [],
      activeOption: null,
    };

    this.$el = $el;
    this.$enhanced = this.$el.querySelector(' [data-module-bind*=autocomplete-enhanced]');
    this.$wrapSelect = this.$el.querySelector('[data-module-bind*=autocomplete-wrap-select]');
    this.$select = this.$wrapSelect.querySelector('[data-module-bind*=autocomplete-select]');
    this.$input = this.$el.querySelector('[data-module-bind*=autocomplete-input]');
    this.$list = this.$el.querySelector('[data-module-bind*=autocomplete-list]');
    this.$amount = this.$el.querySelector('[data-module-bind*=autocomplete-amount]');
    this.$optionTemplate = this.$el.querySelector('[data-module-bind*=autocomplete-list-option]');
    this.$selectOptionTemplate = this.$el.querySelector('[data-module-bind*=autocomplete-select-option]');
  }

  init() {
    this.setupEnhancement();
    this.handleInputEvents();
    this.handleOptionsKeystroke();
    this.hideFoldoutOnBlur();
  }

  // set aria roles, visually replace <select> by <input> and <ul>
  setupEnhancement() {
    this.$wrapSelect.classList.add('u-visually-hidden');
    this.$wrapSelect.setAttribute('aria-hidden', 'true');
    this.$select.removeAttribute('id');
    this.$select.setAttribute('tabindex', '-1');
    this.$enhanced.hidden = false;
  }

  hideFoldoutOnBlur() {
    // hide foldout when clicking outside the component
    document.documentElement.addEventListener('click', (e) => {
      if (!this.$enhanced.contains(e.target)) {
        this.hideMenu();
      }
    });
  }

  handleInputEvents() {
    // if tab out, hide the menu
    this.$input.addEventListener('keydown', (e) => {
      const keyCode = getKeyCode(e);
      if (keyCode === 'tab') {
        this.hideMenu();
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
      this.showMenu();
    });
  }

  showNoResult() {
    this.$list.innerHTML = '';
    const $loaderOption = this.$optionTemplate.cloneNode(true);
    $loaderOption.innerHTML = 'Geen resultaten.';
    $loaderOption.removeAttribute('tabindex');
    $loaderOption.hidden = false;
    this.$list.appendChild($loaderOption);
  }

  handleTyping() {
    const query = this.$input.value;
    // don't start matching from less than 3 characters
    if (query.length < 3) {
      this.$select.value = '';
      this.state.options = [];
      this.$list.innerHTML = '';
      this.hideMenu();
      return;
    }

    this.getMatches(query);
    this.handleResult();
  }

  handleResult() {
    // // hide the list if there are no matches
    if (!this.state.options.length) {
      this.showNoResult();
    } else {
      this.buildMenu();
    }

    this.showMenu();
    // set live region text (screen reader announcement)
    this.$amount.innerHTML = this.state.options.length;
  }

  getMatches(query) {
    this.state.options = fuzzyMatchStringInArray(query, [...this.$select.options]);
  }

  handleInputKeyPressDown() {
    if (!this.state.options.length) {
      return;
    }

    // show menu, focus first item
    this.showMenu();
    this.$options = this.$list.querySelectorAll('[data-module-bind=autocomplete-list-option]');
    this.$options[0].setAttribute('aria-selected', 'true');
    this.$options[0].focus();
    this.state.activeOption = 0;
  }

  buildMenu() {
    this.$list.innerHTML = '';
    this.state.options.forEach((option) => {
      // build autocomplete list item
      const $newOption = this.$optionTemplate.cloneNode(true);
      $newOption.hidden = false;
      $newOption.dataset.optionValue = option.value;
      $newOption.innerHTML = option.innerText;
      $newOption.addEventListener('click', () => {
        this.selectOption(option.value);
      });
      this.$list.appendChild($newOption);
    });
  }

  handleOptionsKeystroke() {
    this.$list.addEventListener('keydown', (e) => {
      const keyCode = getKeyCode(e);
      switch (keyCode) {
        case 'enter':
          this.selectOption(this.$options[this.state.activeOption].dataset.optionValue);
          break;
        case 'tab':
          this.hideMenu();
          break;
        case 'arrowup':
        case 'up':
          if (this.state.activeOption !== 0) {
            this.$options[this.state.activeOption].setAttribute('aria-selected', 'false');
            this.state.activeOption -= 1;
            this.$options[this.state.activeOption].focus();
            this.$options[this.state.activeOption].setAttribute('aria-selected', 'true');
          }
          break;
        case 'arrowdown':
        case 'down':
          if (this.state.activeOption + 1 < this.$options.length) {
            this.$options[this.state.activeOption].setAttribute('aria-selected', 'false');
            this.state.activeOption += 1;
            this.$options[this.state.activeOption].focus();
            this.$options[this.state.activeOption].setAttribute('aria-selected', 'true');
          }
          break;
        case 'escape':
        case 'esc':
          this.hideMenu();
          break;
        // space, tab ?
        default:
        // focus ?
      }
    });
  }

  selectOption(value) {
    const optionObj = this.state.options.find((option) => (
      option.value === value
    ));
    this.$select.value = optionObj.value;
    this.$input.value = optionObj.value;
    this.hideMenu();
  }

  showMenu() {
    this.$input.setAttribute('aria-expanded', 'true');
    this.$list.hidden = false;
  }

  hideMenu() {
    this.$input.setAttribute('aria-expanded', 'false');
    this.$list.hidden = true;
    this.state.activeOption = null;
  }
}

export default ($el) => {
  const inst = new Autocomplete($el);
  inst.init();
};
