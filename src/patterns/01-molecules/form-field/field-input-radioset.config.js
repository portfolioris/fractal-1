module.exports = {
  context: {
    name: 'radio-name',
    label: {
      label: 'field input control',
      isLegend: true,
    },
    items: [
      {
        item: {
          id: 'radio-id-1',
          name: 'radio-name',
          value: '1',
          label: 'input control label 1',
          isRequired: true,
          data: 'data-module-bind="validate-input"',
        },
      },
      {
        item: {
          id: 'radio-id-2',
          name: 'radio-name',
          value: '2',
          label: 'input control label 2',
          isRequired: true,
          data: 'data-module-bind="validate-input"',
        },
      },
    ],
  },
};
