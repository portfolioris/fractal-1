module.exports = {
  context: {
    id: 'modal-unique-id',
    heading: 'Are you sure?',
    rte: '<p>A good description that describes the consequences of this action.</p>',
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
