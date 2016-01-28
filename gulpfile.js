'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['index.js', 'gulpfile.js', './lib/*.js', './test/*.spec.js',
 '!node_modules/**', '!*.json'];

gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src('test/*.spec.js')
    .pipe(mocha());
});

gulp.task('watch', () => {
  return gulp.watch(files, ['lint', 'mocha']);
});

gulp.task('default', ['watch', 'lint', 'mocha']);
