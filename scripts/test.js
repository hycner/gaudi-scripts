process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});

const jest = require('jest');
const argv = process.argv.slice(2);

// Watch unless on CI
if (!process.env.CI) {
  argv.push('--watch');
}

// @remove-on-eject-begin
// This is not necessary after eject because we embed config into package.json.
const createJestConfig = require('../utils/createJestConfig');
const path = require('path');
const paths = require('../config/paths');
argv.push('--config', JSON.stringify(createJestConfig(
  relativePath => path.resolve(__dirname, '..', relativePath),
  path.resolve(paths.appSrc, '..'),
  false
)));
// @remove-on-eject-end
jest.run(argv);

setTimeout(() => {
  console.log('**** paths');
  console.log(paths);
  console.log("**** path.resolve(paths.appSrc, '..')");
  console.log(path.resolve(paths.appSrc, '..'));
  console.log("**** path.resolve(__dirname, '..')");
  console.log(path.resolve(__dirname, '..'));
  console.log('**** argv');
  console.log(argv);
}, 5000);
