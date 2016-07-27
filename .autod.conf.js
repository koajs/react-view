'use strict';

module.exports = {
  write: true,
  prefix: '^',
  exclude: [
    'test/fixtures'
  ],
  devdep: [
    'autod',
    'mocha',
    'istanbul',
    'should',
    'babel-register',
    'babel-preset-es2015',
    'babel-preset-react'
  ],
};
