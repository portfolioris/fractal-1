const toTwoDigit = (number) =>
  number.toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });

exports.toTwoDigit = toTwoDigit;

const getKeyCode = (e) => {
  let code = '';

  if (e.key !== undefined) {
    code = e.key;
  } else if (e.keyIdentifier !== undefined) {
    code = e.keyIdentifier;
  } else if (e.keyCode !== undefined) {
    code = e.keyCode;
  }

  return code.toLowerCase();
};

exports.getKeyCode = getKeyCode;

const simplifyString = (string) => string.replace(/[^a-zA-Z]/g, '').toLowerCase();

exports.simplifyString = simplifyString;

/**
 * @param {string} string
 * @param {array} array
 */
const fuzzyMatchStringInArray = (string, array) => {
  const simpleString = simplifyString(string);
  return array.filter(({ value }) => simplifyString(value).search(simpleString) > -1);
};

exports.fuzzyMatchStringInArray = fuzzyMatchStringInArray;

exports.$ = ($scope, selector) => {
  return $scope.querySelector(selector);
};
exports.$$ = ($scope, selector) => {
  return $scope.querySelectorAll(selector);
};
