/**
 * @author: @AngularClass
 */
import * as path from 'path';

const EVENT = process.env.npm_lifecycle_event || '';

// Helper functions
var ROOT = path.resolve(__dirname, '..');

export function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

export function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

export function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

export var root = path.join.bind(path, ROOT);
