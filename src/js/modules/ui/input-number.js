/*
class InputNumber {
  constructor($el) {
    this.$el = $el;
    this.$addBtn = this.$el.querySelector('[data-module-bind*=input-number-add]');
    this.$removeBtn = this.$el.querySelector('[data-module-bind*=input-number-remove]');
    this.$input = this.$el.querySelector('[data-module-bind*=input-number-input]');
    this.$status = this.$el.querySelector('[data-module-bind*=input-number-status]');
    this.step = parseFloat(this.$input.step);
    this.min = parseFloat(this.$input.min);
    this.max = parseFloat(this.$input.max);
  }

  init() {
    // if module inits, show buttons
    this.$addBtn.hidden = false;
    this.$removeBtn.hidden = false;

    this.$addBtn.addEventListener('click', () => this.increase());
    this.$removeBtn.addEventListener('click', () => this.decrease());
  }

  getInputValue() {
    return parseFloat(this.$input.value);
  }

  increase() {
    // if value is not a number, comparison fails silently
    if (this.getInputValue() + this.step <= this.max) {
      this.$input.value = this.getInputValue() + this.step;
      this.$status.innerHTML = this.$input.value;
    }
  }

  decrease() {
    if (this.getInputValue() - this.step >= this.min) {
      this.$input.value = this.getInputValue() - this.step;
      this.$status.innerHTML = this.$input.value;
    }
  }
}
*/

class InputNumberWC extends HTMLElement {
  // constructor() {
  //   super();
  // }
  connectedCallback() {
    this.innerHTML = `
    <p>foobar</p>
    <slot></slot>
    <p>end</p>
    `;
  }
}

export default () => {
  window.customElements.define('input-number', InputNumberWC);
  // const inst = new InputNumber($el);
  // inst.init();
};
