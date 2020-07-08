import { getKeyCode, fuzzyMatchStringInArray } from '../../utilities';

class Autocomplete {
  constructor($el) {
    this.state = {
      activeOption: null,
    };

    this.apiUrl = $el.dataset.apiUrl;
    this.queryMinLength = $el.dataset.queryMinLength;

    if (!this.apiUrl) {
      this.$wrapSelect = $el.querySelector('[data-module-bind=autocomplete-wrap-select]');
      this.$select = this.$wrapSelect.querySelector('[data-module-bind*=autocomplete-select]');
    }

    this.$enhanced = $el.querySelector(' [data-module-bind=autocomplete-enhanced]');
    this.$input = $el.querySelector('[data-module-bind=autocomplete-input]');
    this.$list = $el.querySelector('[data-module-bind=autocomplete-list]');
    this.$amount = $el.querySelector('[data-module-bind=autocomplete-amount]');
    // I need this later in the click handler
    this.listItemSelector = '[data-module-bind=autocomplete-list-option]';
    this.$optionTemplate = $el.querySelector(this.listItemSelector);
    this.$icon = $el.querySelector('[data-module-bind=autocomplete-icon]');
    this.$clearBtn = $el.querySelector('[data-module-bind=autocomplete-clear]');
  }

  init() {
    this.handleInputEvents();
    this.handleListEvents();
    this.handleClearBtn();
    this.hideFoldoutOnBlur();

    if (this.$input.value.length < this.queryMinLength) {
      return;
    }

    this.getMatches('')
      .then((options) => {
        this.buildMenu(options);

        if (!this.apiUrl) {
          this.setupEnhancement();
        }
      });
  }

  handleListEvents() {
    // event delegation for list item click
    this.$list.addEventListener('click', (e) => {
      if (e.target && e.target.matches(this.listItemSelector)) {
        this.selectOption(e.target.dataset.optionValue);
      }
    });

    // keyboard navigation in the list
    this.$list.addEventListener('keydown', (e) => {
      const keyCode = getKeyCode(e);
      switch (keyCode) {
        case 'enter':
          this.selectOption(e.target.dataset.optionValue);
          break;
        case 'tab':
          this.hideMenu();
          break;
        case 'arrowup':
        case 'up':
          if (this.state.activeOption !== 0) {
            this.highlightOption(this.state.activeOption - 1);
          } else {
            this.$input.focus();
          }
          break;
        case 'arrowdown':
        case 'down':
          this.highlightOption(this.state.activeOption + 1);
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

  /**
   * @param {number} index
   */
  highlightOption(index) {
    const $options = this.$list.querySelectorAll(this.listItemSelector);

    if (index >= $options.length) {
      return;
    }

    if (this.state.activeOption) {
      $options[this.state.activeOption].setAttribute('aria-selected', 'false');
    }

    this.state.activeOption = index;
    $options[this.state.activeOption].focus();
    $options[this.state.activeOption].setAttribute('aria-selected', 'true');
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
      let query = '';

      if (this.apiUrl) {
        query = this.$input.value;
      }

      if (query.length < this.queryMinLength) {
        return;
      }

      this.getMatches(query)
        .then((options) => {
          this.buildMenu(options);
          this.showMenu();
        });
    });
  }

  handleTyping() {
    if (this.$input.value.length) {
      this.showClearButton();
    } else {
      this.hideClearButton();
    }
    // this.setSelectValue('');

    if (this.$input.value.length < this.queryMinLength) {
      this.showMessage('Keep typing...', 0);
      return;
    }

    this.getMatches(this.$input.value)
      .then((options) => this.handleResult(options));
  }

  /**
   * @param {array} options
   */
  handleResult(options) {
    if (!options.length) {
      this.showMessage('No results.', 0);
      this.setSelectValue('');
    } else {
      this.buildMenu(options);
    }

    this.showMenu();
  }

  /**
   * @param {string} message
   */
  showMessage(message, amount) {
    this.$list.innerHTML = '';
    const $loaderOption = this.$optionTemplate.cloneNode(true);
    // make it unselectable
    $loaderOption.removeAttribute('data-module-bind');
    $loaderOption.innerHTML = message;
    $loaderOption.hidden = false;
    this.$list.appendChild($loaderOption);
    this.showMenu();
    // set live region text (screen reader announcement)
    this.$amount.innerHTML = amount;
  }

  /**
   * @param {string} query
   */
  async getMatches(query) {
    if (this.apiUrl) {
      return this.getRemoteMatches(query);
    }

    return this.getSelectMatches(query);
  }

  /**
   * @param {string} query
   */
  getSelectMatches(query) {
    if (query === '') {
      const options = [...this.$select.options];
      options.shift();
      return options;
    }

    return fuzzyMatchStringInArray(query, [...this.$select.options]);
  }

  /**
   * @param {string} query
   */
  async getRemoteMatches(query) {
    const controller = new AbortController();
    const { signal } = controller;
    // controller.abort();

    this.showMessage('Loading...', 0);

    let result;
    try {
      const request = await fetch(`${this.apiUrl}?q=${query}`, { signal });
      result = await request.json();
    } catch (error) {
      result = {
        HasError: true,
      };
    }

    if (result.HasError) {
      return [];
    }

    return result.items;
  }

  handleInputKeyPressDown() {
    const $options = this.$list.querySelectorAll(this.listItemSelector);

    if (!$options.length) {
      return;
    }

    // show menu, focus first item
    this.showMenu();
    this.highlightOption(0);
  }

  /**
   * @param {array} options
   */
  buildMenu(options) {
    this.$list.innerHTML = '';
    options.forEach((option) => {
      // build autocomplete list item
      const $option = this.$optionTemplate.cloneNode(true);
      $option.hidden = false;
      if (this.apiUrl) {
        // depending on data structure from api
        $option.dataset.optionValue = option.id;
        $option.innerHTML = option.name;
      } else {
        // value and innerText from `<option>`
        $option.dataset.optionValue = option.value;
        $option.innerHTML = option.innerText;
      }

      this.$list.appendChild($option);
    });

    // set live region text (screen reader announcement)
    this.$amount.innerHTML = options.length;
  }

  /**
   * @param {string} value
   */
  selectOption(value) {
    this.setSelectValue(value);
    this.$input.value = value;
    this.hideMenu();
  }

  /**
   * @param {string} value
   */
  setSelectValue(value) {
    if (!this.apiUrl) {
      this.$select.value = value;
      const event = new Event('externalChange');
      this.$select.dispatchEvent(event);
    }

    if (value === '') {
      this.$input.setAttribute('aria-invalid', 'true');
      this.$input.setAttribute('aria-describedby', `error--${this.$input.id}`);
    } else {
      this.$input.removeAttribute('aria-invalid');
      this.$input.removeAttribute('aria-describedby');
    }
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

  showClearButton() {
    this.$icon.hidden = true;
    this.$clearBtn.hidden = false;
  }

  hideClearButton() {
    this.$icon.hidden = false;
    this.$clearBtn.hidden = true;
  }

  handleClearBtn() {
    this.$clearBtn.addEventListener('click', () => {
      this.$input.value = '';
      this.$input.focus();
      this.handleTyping();
    });
  }
}

export default ($el) => {
  const inst = new Autocomplete($el);
  inst.init();
};
