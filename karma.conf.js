module.exports = function (config) {
  console.log("KARMA")
  config.set({
    basePath: '',
    frameworks: [
      'jasmine',
      '@angular-devkit/build-angular'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false,
      jasmine: {
        random: false
      }
    },
    customLaunchers: {
      ChromeDebug: {
        base: 'ChromeHeadless',
        flags: ['--remote-debugging-port=9333'],
        debug: true
      }
    },
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    exclude: [],
    preprocessors: {
      './src/test.ts': ['@angular-devkit/build-angular']
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeDebug'],
    singleRun: false,
    browserNoActivityTimeout: 30000
  });
};
