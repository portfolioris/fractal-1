module.exports = {
  context: {
    name: 'autocomplete-example',
    inputSelect: {
      name: 'autocomplete-example',
      id: 'autocomplete-example',
      isRequired: true,
      data: 'data-module-bind="autocomplete-select"',
      items: [
        {
          value: '',
          label: 'Kies...',
          data: ' data-module-bind="autocomplete-select-option"',
        },
      ],
    },
  },
};
