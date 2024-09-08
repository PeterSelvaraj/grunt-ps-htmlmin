/*
 * grunt-ps-htmlmin
 * https://github.com/PSelvaraj/grunt-ps-htmlmin
 *
 * Copyright (c) 2024 Peter Selvaraj
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/*.js',
        'test/data/*.js',
        'test/services/*.js'
      ]
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
          rename: (dest, src) => src.replace('test/fixtures', 'tmp')
        }]
      }
    },

    psHtmlminTest: {
      test: {}
    }
  });

  // Load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Load this plugin's test(s).
  grunt.loadTasks('test');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "dev" task is run, first lint, then run this
  // plugin's task(s).
  grunt.registerTask('dev', ['eslint', 'psHtmlmin']);

  // By default, lint and run all tests.
  grunt.registerTask('test', ['clean', 'psHtmlmin', 'psHtmlminTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['clean', 'eslint', 'psHtmlmin', 'psHtmlminTest']);
};
