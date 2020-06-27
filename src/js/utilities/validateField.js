/**
 * Returns an object with the status and default messages
 * @param $input
 * @returns {{valid: boolean, errorType: *, inputName: *, inputValue: *, errorMessage: *}}
 */

export default ($input) => {
  const errorMessages = {
    valueMissing: $input.dataset.valueMissing || 'Dit is een vereist veld.',
    typeMismatch: $input.dataset.typeMismatch || 'Dit is geen geldige invoer.',
    patternMismatch: $input.dataset.patternMismatch || 'Dit is geen geldige invoer.',
    rangeOverflow: $input.dataset.rangeOverflow || 'Deze waarde ligt te hoog.',
    rangeUnderflow: $input.dataset.rangeUnderflow || 'Deze waarde ligt te laag.',
    invalidDate: $input.dataset.invalidDate || 'Dit is geen geldige datum.',
    outOfRangeDateHistory: $input.dataset.outOfRangeDateHistory || 'De datum ligt te ver in het verleden.',
    outOfRangeDateFuture: $input.dataset.outOfRangeDateFuture || 'De datum ligt te ver in de toekomst.',
  };

  const status = {
    valid: true,
    errorType: null,
    errorMessage: null,
    inputName: null,
    inputValue: null,
  };

  if (!$input) {
    return status;
  }

  // store the value and the name
  status.inputValue = $input.value;
  status.inputName = $input.name;

  // if the input is a radio (part of a set), store the value a little differently
  if ($input.type === 'radio') {
    status.inputValue = null;
    const $checkedRadio = document.querySelector(`input[name="${$input.name}"]:checked`);
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
      status.errorMessage = errorMessages.valueMissing; // 'Dit is een vereist veld.';
    }
    if ($input.validity.typeMismatch) {
      status.errorType = 'typeMismatch';
      status.errorMessage = errorMessages.typeMismatch; // 'Dit is geen geldige invoer.';
    }
    if ($input.validity.patternMismatch) {
      status.errorType = 'patternMismatch';
      status.errorMessage = errorMessages.patternMismatch; // 'Dit is geen geldige invoer.';
    }
    if ($input.validity.rangeOverflow) {
      status.errorType = 'rangeOverflow';
      status.errorMessage = errorMessages.rangeOverflow; // 'Deze waarde ligt te hoog.';
    }
    if ($input.validity.rangeUnderflow) {
      status.errorType = 'rangeUnderflow';
      status.errorMessage = errorMessages.rangeUnderflow; // 'Deze waarde ligt te laag.';
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
