module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-coverage')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false // do not randomize spec execution order
      }
    },
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    files: [
      { pattern: './node_modules/@angular/**/*.js', watched: false, included: false, served: true }, // Include Angular's JavaScript files
      { pattern: './src/test.ts', watched: true, type: 'js' } // Your test.ts file
    ],
    proxies: {
      '/node_modules/': '/base/node_modules/' // Proxy requests from /node_modules/ to /base/node_modules/
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    reporters: ['progress', 'kjhtml'], // Reporters for Karma
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessCI'], // Use ChromeHeadless for testing
    singleRun: false,
    restartOnFileChange: true // Restart Karma on file changes
  });
};
