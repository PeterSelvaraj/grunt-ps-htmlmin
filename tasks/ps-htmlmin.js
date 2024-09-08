/*
 * grunt-ps-htmlmin
 * https://github.com/PSelvaraj/grunt-ps-htmlmin
 *
 * Copyright (c) 2024 Peter Selvaraj
 * Licensed under the MIT license.
 */

'use strict';

const fsp = require('fs').promises;
const log = require('grunt-ps-log');
const terser = require('html-minifier-terser');
const timerSvc = require('./services/timer.service');
const htmlminSvc = require('./services/htmlmin.service');
const defaultOptions = require('./values/default-options.value');

module.exports = function (grunt) {
  grunt.registerMultiTask('psHtmlmin', 'Grunt plugin to minify Html files', async function () {
    const timer = timerSvc();
    const done = this.async();

    const options = this.options(defaultOptions());

    let fileCount = 0;
    const htmlmin = htmlminSvc(fsp, terser);

    const fileExists = filePath => {
      const exists = grunt.file.exists(filePath);
      if (!exists) { log.warn('Source file "' + filePath + '" was not found.'); }
      return exists;
    };

    const minifyFile = async (filePath, destPath, options) => {
      fileCount++;
      await htmlmin.minifyFile(filePath, destPath, options);
      log.verbose('File "' + destPath + '" created.');
    };

    const promises = this.files.flatMap(f => {
      return f.src.filter(fileExists).map(file => minifyFile(file, f.dest, options));
    });

    await Promise.all(promises);

    log.ok(`${fileCount} files minified in ${timer.getTimeElapsed()}`);

    done();
  });
};
