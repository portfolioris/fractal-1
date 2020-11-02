/**
 * Returns an object with the status and default messages
 * @param $input
 * @returns {{valid: boolean, errorType: *, inputName: *, inputValue: *, errorMessage: *}}
 */

import { $ } from './index';

export default ($input) => {
  const errorMessages = {
    valueMissing: $input.dataset.valueMissing || 'This field is required.',
    typeMismatch: $input.dataset.typeMismatch || 'The data you entered is not valid.',
    patternMismatch: $input.dataset.patternMismatch || 'The data you entered is not valid.',
    rangeOverflow: $input.dataset.rangeOverflow || 'The value is too high.',
    rangeUnderflow: $input.dataset.rangeUnderflow || 'The value is too low.',
    // More errortype messages for custom validators
    // invalidDate: $input.dataset.invalidDate || 'This is not a valid date.',
    // rangeDateUnderflow: $input.dataset.rangeDateUnderflow || 'This date is too far in the past.',
    // rangeDateOverflow: $input.dataset.rangeDateOverflow || 'This date is too far in the future.',
  };

  // setup return object
  const status = {
    valid: true,
    errorType: null,
    errorMessage: null,
    inputName: null,
    inputValue: null,
  };

  // store the value and the name
  status.inputValue = $input.value;
  status.inputName = $input.name;

  // if the input is a radio (part of a set), store the value a little differently
  if ($input.type === 'radio') {
    status.inputValue = null;
    const $checkedRadio = $(document, `input[name="${$input.name}"]:checked`);
    if ($checkedRadio) {
      status.inputValue = $checkedRadio.value;
    }
  }

  if ($input.type === 'checkbox' && !$input.checked) {
    status.inputValue = null;
  }

  // Do some cool native validation checking
  if (!$input.validity.valid) {
    status.valid = false;

    if ($input.validity.valueMissing) {
      status.errorType = 'valueMissing';
      status.errorMessage = errorMessages.valueMissing;
    }
    if ($input.validity.typeMismatch) {
      status.errorType = 'typeMismatch';
      status.errorMessage = errorMessages.typeMismatch;
    }
    if ($input.validity.badInput) {
      status.errorType = 'badInput';
      status.errorMessage = errorMessages.typeMismatch;
    }
    if ($input.validity.patternMismatch) {
      status.errorType = 'patternMismatch';
      status.errorMessage = errorMessages.patternMismatch;
    }
    if ($input.validity.rangeOverflow) {
      status.errorType = 'rangeOverflow';
      status.errorMessage = errorMessages.rangeOverflow;
    }
    if ($input.validity.rangeUnderflow) {
      status.errorType = 'rangeUnderflow';
      status.errorMessage = errorMessages.rangeUnderflow;
    }

    return status;
  }

  /*
  if ($input.dataset.validDate) {
    const inputValueParts = status.inputValue.split('-');
    const date = new Date(`${inputValueParts[2]}-${inputValueParts[1]}-${inputValueParts[0]}`);
    if (Number.isNaN(Date.parse(date))) {
      status.valid = false;
      status.errorType = 'invalidDate';
      status.errorMessage = errorMessages.invalidDate; // 'Dit is geen geldige datum.';
      return status;
    }
  }

  if ($input.dataset.minDate) {
    const inputValueParts = status.inputValue.split('-');
    const date = new Date(`${inputValueParts[2]}-${inputValueParts[1]}-${inputValueParts[0]}`);
    const minDateParts = $input.dataset.minDate.split('-');
    const minDate = new Date(`${minDateParts[2]}-${minDateParts[1]}-${minDateParts[0]}`);
    if (date < minDate) {
      status.valid = false;
      status.errorType = 'outOfRange';
      // 'De datum ligt te ver in het verleden.';
      status.errorMessage = errorMessages.outOfRangeDateHistory;
      return status;
    }
  }

  if ($input.dataset.maxDate) {
    const inputValueParts = status.inputValue.split('-');
    const date = new Date(`${inputValueParts[2]}-${inputValueParts[1]}-${inputValueParts[0]}`);
    const maxDateParts = $input.dataset.maxDate.split('-');
    const maxDate = new Date(`${maxDateParts[2]}-${maxDateParts[1]}-${maxDateParts[0]}`);
    if (date > maxDate) {
      status.valid = false;
      status.errorType = 'outOfRange';
      // 'De datum ligt te ver in de toekomst.';
      status.errorMessage = errorMessages.outOfRangeDateFuture;
      return status;
    }
  }

  // for complex regexes, a custom validator
  if ($input.dataset.pattern) {
    const phoneRegex = new RegExp($input.dataset.pattern, 'g');
    if (!phoneRegex.exec(status.inputValue)) {
      status.valid = false;
      status.errorType = 'typeMismatch';
      status.errorMessage = 'Dit is geen geldige invoer.';
      return status;
    }
  }
  */
  return status;
};
