/**
 * @author: @AngularClass
 */

import * as webpack from 'webpack';
import * as helpers from './helpers';
import * as webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common'; // the settings that are common to prod and dev

// import { DllBundlesPlugin } from 'webpack-dll-bundles-plugin';

const webpackMergeTest = webpackMerge.strategy({ 'module.rules': 'replace' });

const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});

/**
 * Webpack Plugins
 */
const {
  DefinePlugin,
  LoaderOptionsPlugin,
} = webpack;

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMergeTest(commonConfig({env: ENV})['metadata'], {
  host: HOST,
  port: PORT,
  ENV,
  HMR,
});


/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */

export default (options): webpack.Configuration => {
  return webpackMergeTest(commonConfig({env: ENV}), {

    entry: {
      test: './src/server.ts',
      // test: './src/server.spec.ts',
    },

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'inline-source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[file].map',

      /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js',

      // library: 'ac_[name]',
      // libraryTarget: 'var',
    },

    module: {

      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.test.json',
              }
            },
          ],
          // exclude: [
          //   'node_modules'
          // ]
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            query: {
              embedSource: true,
              noAutoWrap: true,
            },
          },
          exclude: [
            /\.(spec|e2e)\.ts$/,
            /node_modules/,
          ]
        },

        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },
      ]

    },

    plugins: [

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          ENV: JSON.stringify(METADATA.ENV),
          NODE_ENV: JSON.stringify(METADATA.ENV),
          HMR: METADATA.HMR,
        }
      }),

      // new DllBundlesPlugin({
      //   bundles: {
      //     polyfills: [
      //       'core-js',
      //       {
      //         name: 'zone.js',
      //         path: 'zone.js/dist/zone.js'
      //       },
      //       {
      //         name: 'zone.js',
      //         path: 'zone.js/dist/long-stack-trace-zone.js'
      //       },
      //       'ts-helpers',
      //     ],
      //     vendor: [
      //       'rxjs',
      //     ]
      //   },
      //   dllDir: helpers.root('dll'),
      //   webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
      //     devtool: 'cheap-module-source-map',
      //     plugins: []
      //   })
      // }),

      /**
       * Plugin: NamedModulesPlugin (experimental)
       * Description: Uses file names as module name.
       *
       * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
       */
      // new NamedModulesPlugin(),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
      }),

    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    // devServer: {
    //   port: METADATA.port,
    //   host: METADATA.host,
    //   historyApiFallback: true,
    //   watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000
    //   }
    // },

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    target: 'node',
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
};
