module.exports = {
  context: {
    nameField: {
      name: 'name',
      label: {
        label: 'Name',
        for: 'name',
      },
      input: {
        name: 'name',
        type: 'text',
        isRequired: true,
        autocomplete: 'first-name',
      },
    },
    emailField: {
      name: 'email',
      label: {
        label: 'Email',
        for: 'email',
      },
      input: {
        name: 'email',
        type: 'email',
        isRequired: true,
        autocomplete: 'email',
      },
    },
    autocompleteField: {
      name: 'city',
      label: {
        label: 'City',
        for: 'city',
      },
      inputSelect: {
        name: 'city',
        id: 'city',
      },
    },
    radioField: {
      name: 'expand-fieldset',
      label: {
        label: 'Expand another fieldset',
        for: 'expand-fieldset',
      },
      items: [
        {
          item: {
            id: 'salutation-1',
            name: 'expand-fieldset',
            value: 'no',
            label: 'No',
            isRequired: true,
            data: 'data-module-bind="validate-input"',
          },
        },
        {
          item: {
            id: 'radio-id-2',
            name: 'expand-fieldset',
            value: 'yes',
            label: 'Yes',
            isRequired: true,
            data: 'data-module-bind="validate-input"',
          },
        },
      ],
    },
    submit: {
      button: {
        button: {
          label: 'Submit',
        },
      },
    },
  },
};
