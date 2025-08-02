export default [
  {
    method: 'POST',
    path: '/generate-banner',
    handler: 'controller.generateBanner',
    config: {
      policies: [],
      auth: false,
    },
  },
];