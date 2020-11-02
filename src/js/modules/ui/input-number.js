import { $ } from '../../utilities';

class InputNumber {
  constructor($el) {
    this.$el = $el;
    this.$increaseBtn = $(this.$el, '[data-module-bind=input-number-increase]');
    this.$decreaseBtn = $(this.$el, '[data-module-bind=input-number-decrease]');
    this.$input = $(this.$el, '[data-module-bind=input-number-input]');
    this.$status = $(this.$el, '[data-module-bind=input-number-status]');
    this.step = parseFloat(this.$input.step) || 1;
    this.min = parseFloat(this.$input.min);
    this.max = parseFloat(this.$input.max);
  }

  init() {
    // if module inits, show buttons
    this.$increaseBtn.hidden = false;
    this.$decreaseBtn.hidden = false;

    this.$increaseBtn.addEventListener('click', () => this.increase());
    this.$decreaseBtn.addEventListener('click', () => this.decrease());
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

export default ($el) => {
  const inst = new InputNumber($el);
  inst.init();
};
