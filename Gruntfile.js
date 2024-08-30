/*
 * grunt-ps-htmlmin
 * https://github.com/PSelvaraj/grunt-ps-htmlmin
 *
 * Copyright (c) 2024 Peter Selvaraj
 * Licensed under the MIT license.
 */

'use strict';

const runTests = require('./test/ps-htmlmin-test.js');

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'test/*.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    psHtmlmin: {
      default_options: {
        options: {
        },
        files: [{
          expand: true,
          src: ['test/fixtures/*.html'],
          rename: (dest, src) => src.replace('test\/fixtures', 'tmp')
        }]
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('psHtmlminTest', runTests);

  // By default, lint and run all tests.
  grunt.registerTask('dev', ['jshint', 'psHtmlmin', 'psHtmlminTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'clean', 'psHtmlmin', 'psHtmlminTest']);
};
