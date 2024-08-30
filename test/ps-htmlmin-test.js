'use strict';

const fs = require('fs');
const glob = require('fast-glob');
const log = require('grunt-ps-log');

const runTests = () => {
  const patts = [
    'test/expected/**/*.html'
  ];

  const files = glob.sync(patts);

  files.forEach(file => {
    const outFile = file.replace('test\/expected', 'tmp');

    const inp = fs.readFileSync(file).toString();
    const out = fs.readFileSync(outFile).toString();

    if (inp === out) {
      log.ok('Test passed!');
    }
    else {
      log.warn('Test failed!');
    }
  });
};

module.exports = runTests;
