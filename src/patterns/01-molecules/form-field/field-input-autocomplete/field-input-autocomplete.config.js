module.exports = {
  context: {
    name: 'autocomplete-example',
    inputSelect: {
      name: 'autocomplete-example',
      id: 'autocomplete-example',
      isRequired: true,
      data: 'data-module-bind="validate-input  autocomplete-select" data-value-missing="Please pick an option from the list."',
      items: [
        {
          value: '',
          label: 'Choose...',
        },
        {
          value: 'Foo',
          label: 'Foo',
        },
        {
          value: 'Bar',
          label: 'Bar',
        },
        {
          value: 'Baz',
          label: 'Baz',
        },
        {
          value: 'Amsterdam',
          label: 'Amsterdam',
        },
        {
          value: 'Rotterdam',
          label: 'Rotterdam',
        },
      ],
    },
  },
  variants: [
    {
      name: 'autocomplete-async',
      context: {
        isAsync: true,
      },
    },
  ],
};
