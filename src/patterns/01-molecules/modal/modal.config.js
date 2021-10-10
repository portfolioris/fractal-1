module.exports = {
  context: {
    id: 'modal-unique-id',
    heading: 'Are you sure?',
    rte: '<p>A good description that describes the consequences of this action.</p>',
    triggerBtn: {
      element: 'summary',
      label: 'Open modal',
    },
    submitBtn: {
      element: 'button',
      type: 'submit',
      label: 'Yes, submit',
      data: 'data-modal-focus',
    },
    cancelBtn: {
      element: 'button',
      type: 'button',
      label: 'Close modal',
      data: 'data-modal-close',
    },
  },
};
