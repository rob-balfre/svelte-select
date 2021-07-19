module.exports = {
  use: {
    // Browser options
    headless: false,
    slowMo: 50,

    // Context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Artifacts
    screenshot: "only-on-failure",
    video: "retry-with-video",
  },
  globalSetup: "spec/setup.js",
};
