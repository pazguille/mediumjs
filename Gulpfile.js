'use strict';

/**
 * Module Dependencies.
 */
var mkdirp = require('mkdirp');
var gulp = require('gulp');
var header = require('gulp-header');
var footer = require('gulp-footer');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var ugifyjs = require('gulp-uglify');
var jasmine = require('gulp-jasmine');

/**
 * Package
 */
var pkg = require('./package.json');
var name = 'medium';

/**
 * String
 */
var prefix = ['/*!',
  ' * <%= pkg.name %> - v<%= pkg.version %>',
  ' *',
  ' * Copyright (c) ' + new Date().getFullYear() + ', <%= pkg.author %>',
  ' * Released under the MIT license.',
  ' */',
  '(function(window) {',
  ''].join('\n');
var postfix = '\n}(this));';
var umd = [
  '// AMD',
  'if (typeof window.define === \'function\' && window.define.amd !== undefined) {',
  '  window.define(\'' + name + '\', [], function () {',
  '    return new Medium();',
  '  });',
  '// CommonJS',
  '} else if (typeof module !== \'undefined\' && module.exports !== undefined) {',
  '  module.exports = new Medium();',
  '// Browser',
  '} else {',
  '  window.' + name + ' = new Medium();',
  '};'
  ].join('\n');

/**
 * Create directory
 */
mkdirp('./dist');

/**
 * Build task
 */
gulp.task('build', function() {
  mkdirp('./dist');
  gulp.src('./index.js')
    .pipe(header(prefix, { 'pkg' : pkg }))
    .pipe(footer(postfix))
    .pipe(replace('module.exports = new Medium();', umd))
    .pipe(rename(pkg.name + '.js'))
    .pipe(gulp.dest('./dist/'));
});

/**
 * Min task
 */
gulp.task('min', function() {
  gulp.src('./dist/' + pkg.name + '.js')
    .pipe(ugifyjs())
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(gulp.dest('./dist/'));
});

/**
 * Test task
 */
gulp.task('test', function() {
  return gulp.src('./test/test.js')
    .pipe(jasmine({'reporter': 'spec'}));
});

/**
 * Register tasks
 */
gulp.task('default', ['build']);
gulp.task('dist', ['build', 'min']);
