# grunt-ps-htmlmin

> Grunt plugin to minify Html files

## Getting Started
This plugin requires Grunt `~1.6.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ps-htmlmin --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ps-htmlmin');
```

## The "psHtmlmin" task

### Overview
In your project's Gruntfile, add a section named `psHtmlmin` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  psHtmlmin: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```
