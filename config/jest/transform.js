/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  // presets: ["es2015", "stage-0", "react"] //todo: should this go back to being a preset?
  presets: [
    require.resolve('es2015'),
    require.resolve('stage-0'),
    require.resolve('react'),
  ] //todo: should this go back to being a preset?
});
