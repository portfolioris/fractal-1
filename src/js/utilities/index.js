// const toTwoDigit = (number) =>
//   number.toLocaleString(undefined, {
//     minimumIntegerDigits: 2,
//   });
//
// exports.toTwoDigit = toTwoDigit;
//
export const getKeyCode = (e) => {
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

export const simplifyString = (string) => string.replace(/[^a-zA-Z]/g, '').toLowerCase();

/**
 * @param {string} string
 * @param {array} array
 */
export const fuzzyMatchStringInArray = (string, array) => {
  const simpleString = simplifyString(string);
  return array.filter(({ value }) => simplifyString(value).search(simpleString) > -1);
};

// export const fuzzyMatchStringInArray = fuzzyMatchStringInArray;

export const $ = ($scope, selector) => {
  return $scope.querySelector(selector);
};
export const $$ = ($scope, selector) => {
  return $scope.querySelectorAll(selector);
};
