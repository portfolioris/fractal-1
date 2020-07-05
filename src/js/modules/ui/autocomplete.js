import { getKeyCode, fuzzyMatchStringInArray } from '../../utilities';

class Autocomplete {
  constructor($el) {
    this.state = {
      activeOption: null,
    };

    this.$el = $el;
    this.$enhanced = this.$el.querySelector(' [data-module-bind*=autocomplete-enhanced]');
    this.$wrapSelect = this.$el.querySelector('[data-module-bind*=autocomplete-wrap-select]');
    this.$select = this.$wrapSelect.querySelector('[data-module-bind*=autocomplete-select]');
    console.log(this.$select);
    // this.$options = this.$select.querySelectorAll('[data-module-bind*=autocomplete-option]');
    this.$input = this.$el.querySelector('[data-module-bind*=autocomplete-input]');
    this.$list = this.$el.querySelector('[data-module-bind*=autocomplete-list]');
    this.$amount = this.$el.querySelector('[data-module-bind*=autocomplete-amount]');
    this.$optionTemplate = this.$el.querySelector('[data-module-bind*=autocomplete-list-option]');
    this.$selectOptionTemplate = this.$el.querySelector('[data-module-bind*=autocomplete-select-option]');
  }

  init() {
    this.setupEnhancement();
    this.handleInputEvents();
    this.handleOptionsKeyUp();
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

  // showLoader() {
  //   this.loaderTimeout = setTimeout(() => {
  //     this.$list.innerHTML = '';
  //     const $loaderOption = this.$optionTemplate.cloneNode(true);
  //     $loaderOption.innerHTML = 'Laden...';
  //     $loaderOption.removeAttribute('tabindex');
  //     $loaderOption.hidden = false;
  //     this.$list.appendChild($loaderOption);
  //   }, 800);
  // }

  showNoResult() {
    this.$list.innerHTML = '';
    const $loaderOption = this.$optionTemplate.cloneNode(true);
    $loaderOption.innerHTML = 'Geen resultaten.';
    $loaderOption.removeAttribute('tabindex');
    $loaderOption.hidden = false;
    this.$list.appendChild($loaderOption);
  }

  showError() {
    this.$list.innerHTML = '';
    const $loaderOption = this.$optionTemplate.cloneNode(true);
    $loaderOption.innerHTML = 'Fout bij het ophalen.';
    $loaderOption.removeAttribute('tabindex');
    $loaderOption.hidden = false;
    this.$list.appendChild($loaderOption);
    this.showMenu();
  }

  handleTyping() {
    const query = this.$input.value;
    // don't start matching from less than 3 characters
    if (query.length < 3) {
      // this.state.options = [];
      this.$list.innerHTML = '';
      this.hideMenu();
      return;
    }

    // clearTimeout(this.loaderTimeout);
    // this.showLoader();
    // this.getRemoteMatches(query);
    this.getMatches(query);
    this.handleResult();
  }

  handleResult() {
    // // hide the list if there are no matches
    if (!this.state.options.length) {
      this.state.options = [];
      this.$select.innerHTML = '<option value="">Kies...</option>';
      this.showNoResult();
    } else {
      this.buildMenu(this.state.options);
    }

    this.showMenu();
    // set live region text (screen reader announcement)
    this.$amount.innerHTML = this.state.options.length;
  }

  getMatches(query) {
    this.state.options = fuzzyMatchStringInArray(query, [...this.$select.options]);
  }

  // getRemoteMatches(query) {
  //   fetch(`${this.API_URL}${query}`)
  //     .then((response) => (response.json()))
  //     .then((json) => {
  //       clearTimeout(this.loaderTimeout);
  //       this.state.options = json;
  //       this.handleResult();
  //     })
  //     .catch(() => {
  //       clearTimeout(this.loaderTimeout);
  //       this.showError();
  //     });
  // }

  handleInputKeyPressDown() {
    if (!this.state.options.length) {
      return;
    }

    // show menu, focus first item
    this.showMenu();
    // this.$options = this.$list.querySelectorAll('.js--autocomplete__list-option');
    // this.$options[0].setAttribute('aria-selected', 'true');
    // this.$options[0].focus();
    // this.state.activeOption = 0;
  }

  buildMenu(options) {
    this.$list.innerHTML = '';
    this.$select.innerHTML = '<option value="">Kies...</option>';
    options.forEach((option) => {
      // build autocomplete list item
      const $newOption = this.$optionTemplate.cloneNode(true);
      $newOption.hidden = false;
      $newOption.dataset.optionId = option.name;
      $newOption.innerHTML = `${option.name}<br><small>${this.TYPE_MAP[option.type]}</small>`;
      $newOption.addEventListener('click', () => {
        this.selectOption(option.name);
      });
      this.$list.appendChild($newOption);

      // build <select> options
      const $newSelectOption = this.$selectOptionTemplate.cloneNode(true);
      $newSelectOption.setAttribute('value', option.name);
      $newSelectOption.innerHTML = option.name;
      this.$select.appendChild($newSelectOption);
    });
  }

  handleOptionsKeyUp() {
    this.$list.addEventListener('keydown', (e) => {
      const keyCode = getKeyCode(e);
      switch (keyCode) {
        case 'Enter':
        case 'enter':
          this.selectOption(this.$options[this.state.activeOption].dataset.optionId);
          break;
        case 'Tab':
        case 'tab':
          this.hideMenu();
          break;
        case 'ArrowUp':
        case 'up':
          if (this.state.activeOption !== 0) {
            this.$options[this.state.activeOption].setAttribute('aria-selected', 'false');
            this.state.activeOption -= 1;
            this.$options[this.state.activeOption].focus();
            this.$options[this.state.activeOption].setAttribute('aria-selected', 'true');
          }
          break;
        case 'ArrowDown':
        case 'down':
          if (this.state.activeOption + 1 < this.$options.length) {
            this.$options[this.state.activeOption].setAttribute('aria-selected', 'false');
            this.state.activeOption += 1;
            this.$options[this.state.activeOption].focus();
            this.$options[this.state.activeOption].setAttribute('aria-selected', 'true');
          }
          break;
        case 'Escape':
        case 'esc':
          this.hideMenu();
          break;
        // space, tab ?
        default:
        // focus ?
      }
    });
  }

  selectOption(optionId) {
    const optionObj = this.state.options.find((option) => (
      option.name === optionId
    ));
    this.$select.value = optionObj.name;
    this.$input.value = optionObj.name;
    this.$typeInput.value = optionObj.type;
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
