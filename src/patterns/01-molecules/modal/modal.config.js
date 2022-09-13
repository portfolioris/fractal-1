module.exports = {
  context: {
    id: 'modal-unique-id',
    heading: 'Are you sure?',
    rte: '<p>A good description that describes the consequences of this action.</p>',
    triggerBtn: {
      element: 'a',
      href: '#confirm',
      label: 'Open modal',
      data: 'aria-controls="modal-unique-id"',
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
      label: 'Cancel',
      data: 'data-modal-close',
    },
  },
};
