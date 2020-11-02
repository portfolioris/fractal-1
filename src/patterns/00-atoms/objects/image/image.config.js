module.exports = {
  context: {
    width: 160,
    height: 90,
    isLazy: true,
    alt: 'a placeholder',
    src: '//placehold.it/160x90',
    srcset: [
      {
        src: '//placehold.it/160x90',
        width: 160,
      },
      {
        src: '//placehold.it/320x180',
        width: 320,
      },
      {
        src: '//placehold.it/1280x720',
        width: 1280,
      },
    ],
    sources: [
      {
        media: '(min-width: 40em)',
        srcset: [
          {
            src: '//placehold.it/1280x360',
            width: 1280,
          },
          {
            src: '//placehold.it/1920x540',
            width: 1920,
          },
        ],
      },
    ],
  },
};
