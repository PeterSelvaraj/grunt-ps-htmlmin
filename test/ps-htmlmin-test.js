/*
 * grunt-ps-htmlmin
 * https://github.com/PSelvaraj/grunt-ps-htmlmin
 *
 * Copyright (c) 2024 Peter Selvaraj
 * Licensed under the MIT license.
 */

'use strict';

const glob = require('fast-glob');
const log = require('grunt-ps-log');
const assert = require('./services/assert.service');

module.exports = function (grunt) {
  grunt.registerMultiTask('psHtmlminTest', 'Testing grunt-ps-htmlmin plugin', async function () {
    const done = this.async();

    const patts = [
      'test/expected/**/*.html'
    ];

    const files = glob.sync(patts);

    const promises = files.map(async (inpPath) => {
      const expPath = inpPath.replace('test/expected', 'tmp');

      if (await assert.contentEquality(inpPath, expPath)) {
        log.ok('Test passed!');
      }
      else {
        log.warn('Test failed!');
      }
    });

    await Promise.all(promises);

    done();
  });
};
