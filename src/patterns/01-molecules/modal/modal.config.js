module.exports = {
  context: {
    id: 'modal-unique-id',
    heading: 'Heading of the modal',
    rte: '<p>Are you sure?</p>',
    triggerBtn: {
      element: 'button',
      type: 'button',
      label: 'Open modal',
      data: 'data-module-bind="modal-open"',
    },
    submitBtn: {
      element: 'button',
      type: 'submit',
      label: 'Yes, submit',
      data: 'data-module-bind="modal-gets-focus"',
    },
    cancelBtn: {
      element: 'button',
      type: 'button',
      label: 'Close modal',
      data: 'data-module-bind="modal-close"',
    },
  },
};
