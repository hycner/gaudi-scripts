// Note: this file does not exist after ejecting.

const pathExists = require('path-exists');
const paths = require('../config/paths');

module.exports = (resolve, rootDir, isEjecting) => {
  const setupFiles = [];
  if (pathExists.sync(paths.testsSetup)) {
    // Use this instead of `paths.testsSetup` to avoid putting
    // an absolute filename into configuration after ejecting.
    setupFiles.push('<rootDir>/src/setupTests.js');
  }

  const config = {
    moduleFileExtensions: ['jsx', 'js', 'json'],
    moduleNameMapper: {
      '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': resolve('config/jest/FileStub.js'),
      '^.+\\.css$': resolve('config/jest/CSSStub.js')
    },
    setupFiles: setupFiles,
    testPathIgnorePatterns: ['<rootDir>/(build|docs|node_modules)/'],
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$',
  };
  if (rootDir) {
    config.rootDir = rootDir;
  }
  if (!isEjecting) {
    // This is unnecessary after ejecting because Jest
    // will just use .babelrc in the project folder.
    config.scriptPreprocessor = resolve('config/jest/transform.js');
  }
  return config;
};
