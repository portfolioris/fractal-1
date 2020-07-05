import scrollIntoView from 'scroll-into-view';
import validateField from '../../utilities/validateField';

class Validate {
  constructor($el) {
    this.$form = $el;
    this.$inputs = this.$form.querySelectorAll('[data-module-bind*=validate-input]');
    this.$errors = this.$form.querySelectorAll('[data-module-bind*=validate-error]');
    this.$submitBtn = this.$form.querySelector('[data-module-bind*=validate-submit]');
    this.$conditionalFieldsets = this.$form.querySelectorAll('[data-module-bind*=validate-conditional]');

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  init() {
    // enable custom client side validation
    this.$form.setAttribute('novalidate', '');
    this.$form.addEventListener('submit', this.handleSubmit);
    this.addInputEventListeners();
  }

  addInputEventListeners() {
    Array.from(this.$inputs).forEach(($input) => {
      $input.addEventListener('change', this.handleInputChange);
      $input.addEventListener('externalChange', this.handleInputChange);
    });
  }

  validateField($el) {
    const fieldStatus = validateField($el);

    // find error node
    const $err = Array.from(this.$errors).find(($error) => $error.id === `error--${$el.name}`);

    if (!fieldStatus.valid) {
      // error: set error attributes to field and show errormsg
      $el.setAttribute('aria-invalid', 'true');
      $el.setAttribute('aria-describedby', `error--${$el.id}`);
      $err.hidden = false;
      $err.innerText = fieldStatus.errorMessage;
    } else {
      // no error? un-error it
      $el.removeAttribute('aria-invalid');
      $el.removeAttribute('aria-describedby');
      $err.hidden = true;
    }

    return fieldStatus;
  }

  handleInputChange($el) {
    const fieldStatus = this.validateField($el.target);
    // pass result to conditions check
    this.checkConditions(fieldStatus);
  }

  checkConditions(fieldStatus) {
    // check which fieldset(s) needs to be activated
    Array.from(this.$conditionalFieldsets).forEach(($el) => {
      // find a matching fieldset
      if ($el.dataset.fieldName !== fieldStatus.inputName) {
        return;
      }
      // check if fieldset matches input value
      if ($el.dataset.fieldValue === fieldStatus.inputValue) {
        $el.hidden = false;
        $el.disabled = false;
      } else {
        $el.hidden = true;
        $el.disabled = true;
      }
    });
  }

  handleSubmit(e) {
    let formIsValid = true;
    let $firstInvalid = null;

    Array.from(this.$inputs).forEach(($input) => {
      // check if field is not disabled or in a disabled <fieldset>
      if (!$input.willValidate) {
        return;
      }

      const fieldStatus = this.validateField($input);

      // if a field fails, the whole form is invalid
      if (!fieldStatus.valid) {
        formIsValid = false;

        // store first invalid input
        if (!$firstInvalid) {
          $firstInvalid = $input;
        }
      }
    });

    if (!formIsValid) {
      // don't submit form
      e.preventDefault();
      // scroll first invalid field into view
      scrollIntoView($firstInvalid, () => {
        $firstInvalid.focus();
      });
      return;
    }

    // disable submit to prevent re-submit
    this.$submitBtn.disabled = true;

    // for testing purposes
    // e.preventDefault();
    // console.log('ready to submit');
  }
}

export default ($el) => {
  const inst = new Validate($el);
  inst.init();
};
