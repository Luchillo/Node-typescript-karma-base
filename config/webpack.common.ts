/**
 * @author: @AngularClass
 */

import * as webpack from 'webpack';
import * as helpers from './helpers';
import { readdirSync } from 'fs';

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin

import { CheckerPlugin } from 'awesome-typescript-loader';


// import * as DashboardPlugin from 'webpack-dashboard';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';

/**
 * Webpack Plugins
 */
const {
  IgnorePlugin,
  LoaderOptionsPlugin,
  ProvidePlugin,
} = webpack;

const BannerPlugin: new (options: any) => Plugin = webpack.BannerPlugin as any;

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'GraphQL Tao API',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

let nodeModules = readdirSync('node_modules')
.filter((x) => {
  let condition = ['.bin'].indexOf(x) === -1;
  return condition;
})
.reduce((modules, mod) => {
  modules[mod] = `commonjs ${mod}`;
  return modules;
}, {});

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
export default (options): webpack.Configuration => {
  let isProd = options.env === 'production';
  return {

    /*
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    // cache: false,

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {
      server: './src/server.ts',
    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json'],

      // An array of directory names to be resolved to the current directory
      modules: [helpers.root('src'), helpers.root('node_modules')],

    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      rules: [

        /*
         * Typescript loader support for .ts
         *
         * Component Template/Style integration using `angular2-template-loader`
         * Angular 2 lazy loading (async routes) via `ng-router-loader`
         *
         * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
         * order of the loader matter.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         * See: https://github.com/shlomiassaf/ng-router-loader
         */
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName:
                  options.env === 'test' ? 'tsconfig.test.json' : 'tsconfig.webpack.json'
              }
            },
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        /*
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        /* File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },

      ],

    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

      new CleanWebpackPlugin(['dist'], {
        root: helpers.root(),
        verbose: true,
      }),

      /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See:
       * https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new CheckerPlugin(),

      new IgnorePlugin(/\.(css|less)$/),
      // new BannerPlugin({
      //   banner: 'require("source-map-support").install();',
      //   raw: true,
      //   entryOnly: false,
      // }),

      new ProvidePlugin({
        core: 'core-js',
      }),
      /*
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'polyfills',
      //   chunks: ['polyfills']
      // }),
      // // This enables tree shaking of the vendor modules
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   chunks: ['server'],
      //   minChunks: module => /node_modules/.test(module.resource)
      // }),
      // // Specify the correct order the scripts will be injected in
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: ['polyfills', 'vendor'].reverse()
      // }),

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({}),

      // new DashboardPlugin()
    ],

    externals: nodeModules,

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

  };
};
