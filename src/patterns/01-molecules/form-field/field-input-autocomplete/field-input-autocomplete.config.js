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
};
