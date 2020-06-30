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
        isRequired: true,
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
      },
    },
    submit: {
      button: {
        button: {
          label: 'I can override here',
        },
      },
    },
  },
};
