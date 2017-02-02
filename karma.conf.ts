// Karma configuration
// Generated on Mon Jan 30 2017 09:57:01 GMT-0500 (COT)


import webpackConfig from './config/webpack.test'; // the settings that are common to prod and dev
// import karma from 'karma';

const srcGlob = 'src/**/!(*.spec|*.d).ts';
const testGlob = 'src/**/*.spec.ts';
const webpackEnv = { env: 'test' };

export default (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Fix for typescript mime type to send ts files to browser for testing
    mime : {
      'text/x-typescript': [
        'ts',
        'tsx'
      ]
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'source-map-support'],

    // list of files / patterns to load in the browser
    files: [
      srcGlob,
      // './node_modules/core-js/index.js',
      testGlob
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [srcGlob]: [ 'webpack', 'sourcemap' ],
      // './node_modules/core-js/index.js': [ 'webpack', ],
      [testGlob]: [ 'webpack', 'sourcemap' ],
    },

    webpack: webpackConfig(webpackEnv),
    webpackMiddleware: {noInfo: true},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    reporters: ['progress', 'notification', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      /** Reports can be any that are listed here:
       * https://github.com/istanbuljs/istanbul-reports/tree/master/lib
       */
      reports: [
        'json-summary',
        'lcov',
      ],
      dir: './coverage', // output directory
      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values:
      // config.LOG_DISABLE ||
      // config.LOG_ERROR ||
      // config.LOG_WARN ||
      // config.LOG_INFO ||
      // config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['NodeWebkit'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
