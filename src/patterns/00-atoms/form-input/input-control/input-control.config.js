module.exports = {
  default: 'radio',
  context: {
    id: 'radio-id',
    name: 'radio-name',
    value: 'radio-value',
    label: 'input control label',
    type: 'radio',
    modifier: null,
    isChecked: false,
    isDisabled: false,
    isRequired: false,
    autocomplete: null,
    data: null,
    icon: {
      icon: 'check',
    },
  },
  variants: [
    {
      name: 'radio',
    },
    {
      name: 'checkbox',
      context: {
        id: 'checkbox-id',
        name: 'checkbox-name',
        value: 'checkbox-value',
        label: 'input checkbox label',
        type: 'checkbox',
      },
    },
  ],
};
